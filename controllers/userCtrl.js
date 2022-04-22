const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Payments = require('../models/paymentModel')


const userCtrl = {
    register: async(req, res) =>{
        try{
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg:"The email already exist."})

            if (password.length < 8)
            return res.status(400).json({msg:"Password must be 8 characters long."})

           // Password Encryption
           const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            //Perform A Save To MongoDB
            await newUser.save()

            //JasonWebToken(JWT) for Authentication
            const accesstoken = createAccessToken({id: newUser.id})
            const refreshtoken = createRefreshToken({id: newUser.id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true, //Use httpOnly to mitigate the risk of client side script accessing the protected cookie
                path: '/user/refresh_token'
            })

            res.json({accesstoken})
            

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) =>{
        try{
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if (!user) return res.status(400).json({msg: "Incorrect email or password."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect email or password."})

            //Login Success -> CreateToken + RefreshToken
            const accesstoken = createAccessToken({id: user.id})
            const refreshtoken = createRefreshToken({id: user.id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true, //Use httpOnly to mitigate the risk of client side script accessing the protected cookie
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // = 7 days
            })

            res.json({accesstoken})

        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try{
            res.clearCookie('refreshtoken',{path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        }catch (err) {
            return res.status(500).json({meg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try{
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg:"Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg:"Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req,res) => {
        try{
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    addCart: async (req, res) =>{
        try{
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })
            return res.json({msg: "Added to cart"})
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res) =>{
        try {
            const history = await Payments.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl