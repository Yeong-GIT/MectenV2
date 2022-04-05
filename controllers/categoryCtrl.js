const Category = require('../models/categoryModel')

const categoryCtrl = {
    getCategories: async(req,res) =>{
        try{
            const categories = await Category.find()
            res.json(categories)
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req,res) =>{
        try{
            //
            //only Admin can create, delete and update category
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status.json({msg:"This category has already exists."})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Created a category"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl 