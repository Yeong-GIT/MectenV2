const Users = require('../models/userModel')

const userCtrl = {
    register: async(req, res) =>{
        try{
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg:"The email already exist."})

            if (password.length < 8)
            return res.status(400).json({msg:"Password must be 8 characters long."})

           // Password Encryption

            res.json({msg: "Register Successfully."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userCtrl