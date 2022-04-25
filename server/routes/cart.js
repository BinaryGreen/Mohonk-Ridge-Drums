const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const carts = Cart.getCarts();
        res.send(carts);
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

module.exports = router;