const res = require("express/lib/response");

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

let getUsers = () => users;

function getUser(userId) {
    const user = users.filter((u) => u.userId === userId);
    return user;
}

async function login(email, password) {
    const user = users.filter((e) => e.email === email);
    if(!user[0]) throw Error('Email not found');
    if(user[0].password !== password) throw Error('The password you entered is not correct');

    return user[0];
};

function register(user) {
    const e = userExists(user.email);
    if(e.length > 0) throw Error ('Email already exists');

    const newUser = {
        userId: users[users.length - 1].userId + 1,
        email: user.email,
        name: {
            fname: user.fname,
            lname: user.lname
        },
        address: user.address,
        password: user.password,
        birthdate: user.birthdate,
        phone: user.phone
    }
    users.push(newUser);
    console.log(users);
    return newUser;
}

function deleteUser(userId) {
    let i = users.map((user) => user.userId).indexOf(userId);
    users.splice(i, 1);
    console.log(users);
}

function userExists(email) {
    return users.filter((e) => e.email === email);
}

function update(info) {
    const user = users.find((u) => u.userId === info.userId);
    user.email = info.newInfo.email;
    user.password = info.newInfo.password;
    user.name.fname = info.newInfo.fname;
    user.name.lname = info.newInfo.lname;
    user.address = info.newInfo.address;
    user.phone = info.newInfo.phone;
    user.birthdate = info.newInfo.birthdate;
    return user;
}

module.exports = { getUsers, login, register, deleteUser, getUser, update };