const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.getUsers();
        res.send(users);
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

.post('/edit', async (req, res) => {
    try {
        const user = await User.getUser(req.body);
        res.send(user);
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

.put('/update', async (req, res) => {
    try {
        const user = await User.update(req.body);
        res.send(user);
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        res.send({...user, user_password: undefined});
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body);
        res.send({...user, user_password: undefined})
    } catch(error) {
        res.status(401).send({message: error.message})
    }
})

.delete('/delete', async (req, res) => {
    try {
        await User.deleteUser(req.body.userId);
        res.send({success: 'User deleted'});
    } catch(error) {
        res.status(401).send({message: error.message});
    }
})


module.exports = router;

