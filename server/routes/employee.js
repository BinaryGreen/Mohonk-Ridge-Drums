// unused

const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const employees = Employee.getEmployees();
        res.send(employees);
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

module.exports = router;