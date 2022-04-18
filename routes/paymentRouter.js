const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authSeller = require('../middleware/authSeller')


router.route('/payment')
    .get(auth, authSeller, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)


module.exports = router