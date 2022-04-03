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

            res.json({msg: "Register Success"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userCtrl