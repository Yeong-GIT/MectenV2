const Products = require('../models/productModel')

//Filter, sorting and pagination

class APIfeature{
    constructor (query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}
        console.log({before: queryObj})
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        console.log({after: queryObj})

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        //Query.prototype function is used to specify a $gte query condition. 
        //.gte() => It returns documents that are greater than or equal the specified condition.
        //.gt() => It returns documents that are greater than the specified condition.
        //.lte() => It returns documents that are less than or equal to the specified condition.
        //.lt() => It returns documents that are less than the specified condition.
        //.regex() => Filter based on alphabet

         
        console.log({queryStr})
        this.query.find(JSON.parse(queryStr))

        return this;

    }


    sorting(){}


    paginating(){}
}

const productCtrl = {
    getProducts: async(req,res) => {
        try{
            const features = new APIfeature(Products.find(), req.query).filtering()

            const products = await features.query

            res.json(products)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        try{
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image uploaded"})

            const product = await Products.findOne({product_id})
            if (product)
            return res.status(400).json({msg:"This product has already exist"})

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newProduct.save()
            res.json({msg: "Created a new product"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) =>{
        try{
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try{
            const {title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image uploaded"})

            await Products.findByIdAndUpdate({_id: req.params.id},{
                title: title.toLowerCase(), price, description, content, images, category
            })

            res.json({msg:"Updated a Product"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}


module.exports = productCtrl