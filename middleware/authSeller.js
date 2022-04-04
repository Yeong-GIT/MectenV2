const USers = require("../models/userModel")

const authSeller = async (req,res, next) => {
    try{
        //Get Seller Information by ID
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 0)
        return res.status(400).json({msg:"Seller information access denied"})

        next()

    }catch (err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authSeller