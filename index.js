const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require("./server/routes/user");
const orderRoutes = require("./server/routes/order");
const employeeRoutes = require("./server/routes/employee");
const cartRoutes = require("./server/routes/cart");

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/employees", employeeRoutes);
app.use("/carts", cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));