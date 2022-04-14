const router = require('express').Router()
const categoryCtrl = require ('../controllers/categoryCtrl')
const auth = require('../middleware/auth')
const authSeller = require('../middleware/authSeller')


router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth, authSeller, categoryCtrl.createCategory)

router.route('/category/:id')
.delete(auth, authSeller, categoryCtrl.deleteCategory)
.put(auth, authSeller, categoryCtrl.updateCategory)

module.exports = router