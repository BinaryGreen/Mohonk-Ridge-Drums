const { format } = require('date-fns');
const con = require('./db_connect');

async function createOrderTable() { 
    let sql = `CREATE TABLE IF NOT EXISTS orders (
        order_id INT NOT NULL AUTO_INCREMENT,
        user_id INT,
        order_address VARCHAR(255),
        order_date VARCHAR(255),
        order_total NUMERIC,
        CONSTRAINT order_pk PRIMARY KEY(order_id)
    )`;
    await con.query(sql);
}

async function createItemTable() {
    let sql = `CREATE TABLE IF NOT EXISTS orderitems (
        order_id INT,
        item_id INT NOT NULL AUTO_INCREMENT,
        item_material VARCHAR(255),
        item_construction VARCHAR(255),
        item_diameter NUMERIC,
        item_depth NUMERIC,
        item_thickness NUMERIC,
        item_finish VARCHAR(255),
        item_hardware VARCHAR(255),
        item_price NUMERIC,
        CONSTRAINT item_pk PRIMARY KEY (item_id)
    )`;
    await con.query(sql);
}

async function exampleOrder() {
    const check = `SELECT * FROM orders WHERE order_id = "3"`;
    let sql = `INSERT INTO orders (order_id, user_id, order_address, order_date, order_total)
    VALUES ("3", "1", "123 Main Street, New Paltz, New York 12561", "2022-02-12", "650"),
           ("4", "1", "123 Main Street, New Paltz, New York 12561", "2022-05-01", "290")
    `;
    const arr = await con.query(check);
    if (arr.length === 0) {
        await con.query(sql);
    }
}

async function exampleItem() {
    const check = `SELECT * FROM orderitems WHERE order_id = "3"`;
    const sql = `
        INSERT INTO orderitems (
            order_id, item_id, item_material, item_construction, item_diameter, item_depth, item_thickness, item_finish, item_hardware, item_price
        ) VALUES ("3", "1", "Beech", "Stave", "12", "4", "4", "Green Sparkle", "Satin Chrome", "350"),
                 ("4", "2", "Oak", "Steambent", "8", "3.5", "3.5", "Orange", "Brass", "300"),
                 ("4", "3", "Maple", "Segment", "13", "3.5", "3.5", "Shell Material", "Chrome", "290")
        `;
    const arr2 = await con.query(check);
    if (arr2.length === 0) {
        await con.query(sql);
    }
}

createOrderTable();
createItemTable();
exampleOrder();
exampleItem();

const getOrders = async () => {
    const sql = `SELECT * FROM orders`;
    return await con.query(sql);
}

async function getUserOrders(user) {
    const sql = `SELECT * FROM orders WHERE user_id = "${user.userId}"`;
    const orders = await con.query(sql);
    return orders;
}

async function getProducts(user_id) {
    const orders = await getUserOrders(user_id);
    const allOrders = []
    for(let i = 0; i<orders.length; i++) {
        const sql = `SELECT * FROM orderitems 
            WHERE order_id = ${orders[i].order_id}
        `
        const products = await con.query(sql);
        const singleOrder = {
            orderId: orders[i].order_id,
            address: orders[i].order_address,
            date: orders[i].order_date,
            total: orders[i].order_total,
            allProducts: products
        }
     allOrders.push(singleOrder);
    }
    return allOrders;
}

async function placeOrder(info) {
    const sqlsum = `SELECT SUM(item_price) AS sum FROM cartitems
    WHERE user_id = "${info.userId}"`;
    const sum = await con.query(sqlsum);

    const sqladdress = `SELECT user_address AS address FROM users WHERE user_id = "${info.userId}"`;
    const address = await con.query(sqladdress);

    const d = new Date();
    const orderDate = format(d, "yyyy-MM-dd");

    const sqlorder = `INSERT INTO orders (
        user_id, order_address, order_date, order_total)
        VALUES ("${info.userId}", "${address[0].address}", "${orderDate}", "${sum[0].sum}")
    `;
    const newOrder = await con.query(sqlorder);

    const sqlid = `SELECT MAX(order_id) AS maxid FROM orders WHERE user_id = "${info.userId}"`;
    const oid = await con.query(sqlid);

    for (let i = 0; i < info.cart.length; i++) {
        let sqlitem = `INSERT INTO orderitems (
            order_id, item_material, item_construction, item_diameter, item_depth, item_thickness, item_finish, item_hardware, item_price
        ) VALUES (
            "${oid[0].maxid}",
            "${info.cart[i].item_material}",
            "${info.cart[i].item_construction}",
            "${info.cart[i].item_diameter}",
            "${info.cart[i].item_depth}",
            "${info.cart[i].item_thickness}",
            "${info.cart[i].item_finish}",
            "${info.cart[i].item_hardware}",
            "${info.cart[i].item_price}"
        )`;
        await con.query(sqlitem);
    }

    const sqldel = `DELETE FROM cartitems WHERE user_id = "${info.userId}"`;
    await con.query(sqldel);
}

module.exports = { getOrders, getUserOrders, getProducts, placeOrder };