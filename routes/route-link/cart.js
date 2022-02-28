var express = require('express');
var router = express.Router();
const { auth } = require('../../middleware/authorization.js')
const { c_cart } = require('../../controllers')

router
    .get('/getCartBy/:user_id', auth, c_cart.readDataBy)
    .post('/addCart', auth, c_cart.addData)
    .post('/checkoutCart', auth, c_cart.CheckoutData)
    .post('/payment/:user_id', auth, c_cart.paymentData)
    .delete('/deleteCart/:cart_id', auth, c_cart.deleteDataBy)
    
    module.exports = router;