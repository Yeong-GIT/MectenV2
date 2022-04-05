const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const auth = require('../middleware/auth')
const authSeller = require('../middleware/authSeller')

//Upload image on cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


//Upload Image
router.post('/upload', (req, res)=>{
    try{
        console.log(req.files)
        res.json('test upload')
    }catch(err){
        res.status(500).json({msg: err.message})
    }
    
})

module.exports = router