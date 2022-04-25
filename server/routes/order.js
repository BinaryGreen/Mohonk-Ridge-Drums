const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const orders = Order.getOrders();
        res.send(orders);
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

.post('/list', (req, res) => {
    try {
        const orders = Order.getUserOrders(req.body.userId);
        res.send(orders);
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

module.exports = router;