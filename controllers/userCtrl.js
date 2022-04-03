const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    }
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl