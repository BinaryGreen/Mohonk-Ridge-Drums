class User {
    constructor(email, pswd) { // new account
        this.email = email;
        this.pswd = pswd; // add password checker function
    }
    
    // getters
    getEmail = () => this.email;
    getPswd = () => this.pswd;

    //setters
    setEmail = (email) => this.email = email;
    setPswd = (password) => this.pswd = password;
}

let loginform = document.getElementById('login');
loginform.addEventListener('submit', login);

function login (e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let pswd = document.getElementById('pswd').value;

    const userlogin = new User(email, pswd);
    console.log(userlogin); 
}