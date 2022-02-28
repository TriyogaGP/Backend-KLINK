const express = require('express');
const router = express.Router();

const product = require('./product');
const cart = require('./cart');

router
    .use('/moduleProduct', product)
    .use('/moduleCart', cart)

module.exports = router