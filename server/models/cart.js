const con = require('./db_connect');

async function createCartItemsTable() {
    let sql = `CREATE TABLE IF NOT EXISTS cartitems (
        user_id INT,
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

createCartItemsTable();

const getCarts = async () => {
    const sql = `SELECT * FROM cartitems`;
    return await con.query(sql);
}

async function getUserCart(user) {
    const sql = `SELECT * FROM cartitems
    WHERE user_id = "${user.userId}"
    ORDER BY item_id DESC
    `;
    return await con.query(sql);
}

async function addToCart(info) { // placeholder for item_price
    const sql = `INSERT INTO cartitems (
        user_id, item_material, item_construction, item_diameter, item_depth, item_thickness, item_finish, item_hardware, item_price
    ) VALUES (
        "${info.uid}",
        "${info.material}",
        "${info.construction}",
        "${info.diameter}",
        "${info.depth}",
        "${info.thickness}",
        "${info.finish}",
        "${info.hardware}",
        "${(Math.floor(Math.random() * (600 - 300) + 300))}"
    )`;
    return await con.query(sql);
}

async function removeItem(key) {
    const sql = `DELETE FROM cartitems
    WHERE item_id = ${key.targetKey}
    `;
    await con.query(sql);
}

module.exports = { getCarts, getUserCart, addToCart, removeItem };