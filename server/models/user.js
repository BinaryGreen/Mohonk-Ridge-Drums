const con = require('./db_connect');

const users = [
    {
        userId: 12345,
        email: 'coder@gmail.com',
        name: {
            fname: 'Dan',
            lname: 'Mango'
        },
        address: '123 Main Street, New Paltz, New York 12561',
        password: 'banana',
        birthdate: '2000-02-09',
        phone: '123-456-7890'
    },
    {
        userId: 67890,
        email: 'coffee24@newpaltz.edu',
        name: {
            fname: 'Johnny',
            lname: 'Espresso'
        },
        address: '60 West Boulevard, Coffeeville, New York, 03045',
        password: 'ilikecoffee',
        birthdate: '1975-07-15',
        phone: '333-712-9140'
    }
];

async function createTable() { 
    let sql = `CREATE TABLE IF NOT EXISTS users (
        user_id INT NOT NULL AUTO_INCREMENT,
        user_email VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
        user_firstname VARCHAR(255) NOT NULL,
        user_lastname VARCHAR(255) NOT NULL,
        user_address VARCHAR(255) NOT NULL,
        user_phone NUMERIC NOT NULL,
        user_birthdate VARCHAR(255) NOT NULL,
        CONSTRAINT user_pk PRIMARY KEY(user_id)
    )`;
    await con.query(sql);
}

createTable();

let getUsers = async () => {
    const sql = `SELECT * FROM users`;
    return await con.query(sql);
}

async function getUser(userId) {
    let sql;
    if (userId) {
        sql = `SELECT * FROM users
        WHERE user_id = ${userId}
        `;
    }
    return await con.query(sql);
}

async function login(email, password) {
    const user = await userExists(email);
    if(!user[0]) throw Error('Email not found');
    if(user[0].password !== password) throw Error('The password you entered is not correct');

    return user[0];
};

async function register(user) {
    const e = userExists(user.email);
    if(e.length > 0) throw Error ('Email already exists');

    const sql = `INSERT INTO users (user_email, user_password, user_firstname, user_lastname, user_address, user_phone, user_birthdate)
        VALUES ("${user.email}", "${user.password}", "${user.fname}", "${user.lname}", "${user.address}", "${user.phone}", "${user.birthdate}")
        `;
    
    const insert = await con.query(sql);
    const newUser = await getUser(user);
    return newUser[0];
}

async function deleteUser(userId) {
    const sql = `DELETE FROM users
        WHERE user_id = ${userId}
        `;
    await con.query(sql);
}

async function userExists(email) {
    const sql = `SELECT * FROM users WHERE user_email = "${email}"`;
    
    return await con.query(sql);
}

async function update(info) {

    const sql = 
    `
        UPDATE users SET
        user_email = "${info.newInfo.email}",
        user_password = "${info.newInfo.password}",
        user_firstname = "${info.newInfo.fname}",
        user_lastname = "${info.newInfo.lname}",
        user_address = "${info.newInfo.address}",
        user_phone = "${info.newInfo.phone}",
        user_birthdate = "${info.newInfo.birthdate}"
        WHERE user_id = ${info.userId}
    `;
    const update = await con.query(sql);
    const newUser = await getUser(info.userId);
    return newUser[0];
}

module.exports = { getUsers, login, register, deleteUser, getUser, update };