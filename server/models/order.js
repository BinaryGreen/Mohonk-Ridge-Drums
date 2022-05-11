const con = require('./db_connect');

const orders = [
    {
        orderId: 220,
        orderedBy: 12345,
        items: [
            {
                itemId: 1,
                material: 'Beech',
                construction: 'Stave',
                diameter: 12,
                depth: 4,
                thickness: 4,
                finish: 'Green Sparkle',
                hardware: 'Satin Chrome',
                price: 350
            },
            {
                itemId: 2,
                material: 'Oak',
                construction: 'Steambent',
                diameter: 8,
                depth: 3.5,
                thickness: 3.5,
                finish: 'Orange',
                hardware: 'Brass',
                price: 300
            }
        ],
        address: '123 Main Street, New Paltz, New York 12561',
        total: 650
    },
    {
        orderId: 221,
        orderedBy: 12345,
        items: [
            {
                itemId: 1,
                material: 'Birch',
                construction: 'Segment',
                diameter: 14,
                depth: 3.9,
                thickness: 3.7,
                finish: 'Black Sparkle',
                hardware: 'Chrome',
                price: 460
            },
        ],
        address: '123 Main Street, New Paltz, New York 12561',
        total: 460
    },
    {
        orderId: 222,
        orderedBy: 67890,
        items: [
            {
                itemId: 1,
                material: 'Mahogany',
                construction: 'Ply',
                diameter: 10,
                depth: 4,
                thickness: 3.5,
                finish: 'Shell Material',
                hardware: 'Chrome',
                price: 300
            }
        ],
        address: '60 West Boulevard, Coffeeville, New York, 03045',
        total: 300
    }
];

async function createOrderTable() { 
    let sql = `CREATE TABLE IF NOT EXISTS orders (
        order_id INT NOT NULL AUTO_INCREMENT,
        user_id INT,
        order_address VARCHAR(255),
        order_date VARCHAR(255),
        order_total NUMERIC,
        CONSTRAINT order_pk PRIMARY KEY(order_id),
        CONSTRAINT user_fk FOREIGN KEY(user_id) REFERENCES users(user_id)
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
        CONSTRAINT item_pk PRIMARY KEY (item_id),
        CONSTRAINT order_fk FOREIGN KEY(order_id) REFERENCES orders(order_id)
    )`;
    await con.query(sql);
}

async function exampleOrder() {
    const check = `SELECT * FROM orders WHERE order_id = "3"`;
    let sql = `INSERT INTO orders (order_id, user_id, order_address, order_date, order_total)
    VALUES ("3", "6", "123 Main Street, New Paltz, New York 12561", "2022-02-12", "650")
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
                 ("3", "2", "Oak", "Steambent", "8", "3.5", "3.5", "Orange", "Brass", "300")`;
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
    console.log(user.userId);
    const sql = `SELECT * FROM orders WHERE user_id = "${user.userId}"`;
    const orders = await con.query(sql);
    return orders;
}

module.exports = { getOrders, getUserOrders };