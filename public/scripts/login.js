async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    if(response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function removeCurrentUser() {
    localStorage.removeItem('user');
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

// logout button listener on account.html

function logout() {
    removeCurrentUser();
    window.location.href = "index.html";
}

class User {
    constructor(fname, lname, email, password, birthdate, phone, address) { // new account
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password; // add password checker function
        this.birthdate = birthdate;
        this.phone = phone;
        this.address = address;
    }
}

const loginform = document.getElementById('login');
if (loginform) loginform.addEventListener('submit', login);

function login (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('pswd').value;

    postData('http://localhost:3000/users/login', {email: email, password: password})
    .then((data) => {
        if(!data.message) {
            setCurrentUser(data);
            window.location.href = 'account.html'
        }
    })
    .catch((error) => {
        const errText = error.message;
        document.querySelector("#errormsg").innerHTML = errText;
        document.getElementById("pswd").value = "";
        console.log(`Error! ${errText}`)
    });
}

let registerform = document.getElementById('createaccount');
if (registerform) registerform.addEventListener('submit', register);

function register (e) {
    e.preventDefault();

    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('pswd').value;
    let birthdate = document.getElementById('bdate').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;

    const user = new User(fname, lname, email, password, birthdate, phone, address);

    postData('http://localhost:3000/users/register', {
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        password: user.password,
        birthdate: user.birthdate,
        phone: user.phone,
        address: user.address
    })
    .then((data) => {
        if(!data.message) {
            setCurrentUser(data);
            window.location.href="account.html";
        }
    })
    .catch((error) => {
        const errText = error.message;
        document.querySelector("#errormsg").innerHTML = errText;
        document.getElementById('pswd').value = "";
        console.log(`Error! ${errText}`)
    });
}

export default logout;