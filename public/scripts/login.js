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

class User {
    constructor(email, pswd) { // login to account
        this.email = email;
        this.pswd = pswd;
    }
    
    // getters
    getEmail = () => this.email;
    getPswd = () => this.pswd;

    //setters
    setEmail = (email) => this.email = email;
    setPswd = (password) => this.pswd = password;
}

function login (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const pswd = document.getElementById('pswd').value;

    postData('http://localhost:3000/users/login', {email: email, password: pswd})
    .then((data) => {
        if(!data.message) {
            // window.location.href = "index.html"; <------------- link to account page (wip)
        }
    })
    .catch((error) => {
        const errText = error.message;
        document.querySelector("#errormsg").innerHTML = errText;
        document.getElementById("pswd").value = "";
        console.log(`Error! ${errText}`)
    });
}

const loginform = document.getElementById('login');
loginform.addEventListener('submit', login);