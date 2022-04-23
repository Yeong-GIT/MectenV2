const router = require('express').Router()
const productCtrl= require ('../controllers/productCtrl')
const auth = require('../middleware/auth')
const authSeller = require('../middleware/authSeller')

router.route('/products')
    .get(productCtrl.getProducts)
    .post(auth, authSeller, productCtrl.createProduct)


router.route('/product/:id')
    .delete(auth, authSeller, productCtrl.deleteProduct)
    .put(auth, authSeller, productCtrl.updateProduct)



module.exports = router