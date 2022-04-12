class User {
    constructor(fname, lname, email, pswd, bdate, phone, address) { // new account
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.pswd = pswd; // add password checker function
        this.bdate = bdate;
        this.phone = phone;
        this.address = address;
    }
    
    // getters
    getFirstName = () => this.fname;
    getLastName = () => this.lname;
    getEmail = () => this.email;
    getPswd = () => this.pswd;
    getBdate = () => this.bdate;
    getPhone = () => this.phone;
    getAddress = () => this.address;

    //setters
    setFirstName = (firstName) => this.fname = firstName;
    setLastName = (lastName) => this.lname = lastName;
    setEmail = (email) => this.email = email;
    setPswd = (password) => this.pswd = password;
    setBdate = (birthdate) => this.bdate = birthdate;
    setPhone = (phone) => this.phone = phone;
    setAddress = (address) => this.address = address;
}

let createaccountform = document.getElementById('createaccount');
createaccountform.addEventListener('submit', createAccount);

function createAccount (e) {
    e.preventDefault();

    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let pswd = document.getElementById('pswd').value;
    let bdate = document.getElementById('bdate').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;

    const user = new User(fname, lname, email, pswd, bdate, phone, address);
    console.log(user);
}
