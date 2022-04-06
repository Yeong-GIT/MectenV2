const Products = require('../models/productModel')

const productCtrl = {
    getProducts: async(req,res) => {
        try{
            const products = await Products.find()
            res.json(products)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createProducts: async(req, res) =>{
        try{
            const {product_id, category, title, condition, price, description, content, images, checked, sold} = req.body;
            if(!images) return res.status(400).json({msg: 'No image uploaded'})

            const product = await Products.findOne({product_id})
            if(product)
                return res.status(400).json({msg: "This product has already exists."})

            const newProduct = new Products({
                product_id, category, title:title.toLowerCase(), condition, price, description, content, images, checked, sold
            })

            await newProduct.save()
            res.json({msg :"Created a product"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProducts: async(req, res) =>{
        try{
            res.json('test')
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateProducts: async(req, res) =>{
        try{
            res.json('test')
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}


module.exports = productCtrl