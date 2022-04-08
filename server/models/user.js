const users = [
    {
        userId: 12345,
        email: 'coder@gmail.com',
        name: {
            fname: 'Dan',
            lname: 'Mango'
        },
        shippingAddress: {
            streetaddress: '123 Main Street',
            city: 'New Paltz',
            state: 'New York',
            post: 12561
        },
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
        shippingAddress: {
            streetaddress: '60 West Boulevard',
            city: 'Coffeeville',
            state: 'New York',
            post: 03045
        },
        password: 'ilikecoffee',
        birthdate: '1975-07-15',
        phone: '333-712-9140'
    }
];

let getUsers = () => users;

async function login(email, password) {
    const user = users.filter((e) => e.email === email);
    if(!user[0]) throw Error('User not found');
    if(user[0].password !== password) throw Error('The password you entered is not correct');

    return user[0];
};

module.exports = { getUsers, login };