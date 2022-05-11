const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orders = await Order.getOrders();
        res.send(orders);
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

.post('/list', async (req, res) => {
    try {
        const orders = await Order.getUserOrders(req.body);
        res.send(orders);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

module.exports = router;