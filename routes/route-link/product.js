var express = require('express');
var router = express.Router();
const { auth } = require('../../middleware/authorization.js')
const { c_product } = require('../../controllers')

router
    .get('/getProduct', auth, c_product.readData)
    .post('/createProduct', auth, c_product.createData)
    .delete('/deleteProduct/:product_id', auth, c_product.deleteData)
    
    module.exports = router;