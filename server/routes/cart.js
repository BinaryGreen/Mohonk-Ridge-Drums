const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const carts = await Cart.getCarts();
        res.send(carts);
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

.post('/list', async (req, res) => {
    try {
        const cart = await Cart.getUserCart(req.body);
        res.send(cart);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

.post('/add', async (req, res) => {
    try {
        const add = await Cart.addToCart(req.body);
        res.send(add);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

.delete('/remove', async (req, res) => {
    try {
        const remove = await Cart.removeItem(req.body);
        res.send({success: 'Item removed from cart'});
    } catch (error) {
        res.status(401).send({message: error})
    }
})

module.exports = router;