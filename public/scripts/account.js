import { logout, setCurrentUser, getCurrentUser } from './login.js'
import fetchData from './fetchdata.js';

class User {
    constructor(fname, lname, email, password, birthdate, phone, address) { // new account
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.phone = phone;
        this.address = address;
    }
}

let user = getCurrentUser();

const logoutButton = document.getElementById('logoutbutton');
if (logoutButton) logoutButton.addEventListener('click', logout);

const deleteButton = document.getElementById('deletebutton');
if (deleteButton) deleteButton.addEventListener('click', deleteAccount);

function deleteAccount() {
    if(confirm('Are you sure you want to delete your account?')) {
        fetchData('/users/delete', {userId: user.userId}, "DELETE")
        .then((data) => {
            if(!data.message) {
                console.log(data.success);
                logout();
            }
        })
        .catch((error) => {
            const errText = error.message;
            document.getElementById('accounterror').innerHTML = errText;
            console.log(`Error! ${errText}`);
        })
    }
}

const openupdate = document.getElementById('openupdate');
const editForm = document.getElementById('editaccount');
if (openupdate) openupdate.addEventListener('click', toggleEdit);

function toggleEdit() {
    editForm.style.display = ! editForm.style.display ? 'block' : '';

    const fname = document.getElementById('fname')
    const lname = document.getElementById('lname')
    const email = document.getElementById('email')
    const password = document.getElementById('pswd')
    const birthdate = document.getElementById('bdate')
    const phone = document.getElementById('phone')
    const address = document.getElementById('address')

    if (editForm.style.display === 'block') {
        fetchData('/users/edit', {userId: user.userId}, "POST")
        .then((data) => {
            if(!data.message) {
                fname.value = data[0].name.fname;
                lname.value = data[0].name.lname;
                email.value = data[0].email;
                password.value = data[0].password;
                birthdate.value = data[0].birthdate;
                phone.value = data[0].phone;
                address.value = data[0].address;
            }
        })
        .catch((error) => {
            const errText = error.message;
            document.getElementById('updateError').innerHTML = errText;
            console.log(`Error! ${errText}`);
        })
    }
}

const openhistory = document.getElementById('openhistory');
const orderList = document.getElementById('orderlist');
if (openhistory) openhistory.addEventListener('click', toggleHistory);

function toggleHistory() {

    orderList.style.display = ! orderList.style.display ? 'block' : ''; 

    if (orderList.style.display === 'block') {
        fetchData('/orders/list', {userId: user.userId}, "POST")
        .then(data => {
            data.forEach(order => {

                let html = 
                `
                <div class="singleOrder">
                    <h1 class="orderheading">Order # ${order.orderId}</h1> <hr>
                    ${order.items.map(i => {
                        return (
                            `
                                <h2 class="drumheading">Drum # ${i.itemId}:</h2>
                                <p class="item">Material: ${i.material}</p>
                                <p class="item">Construction: ${i.construction}</p>
                                <p class="item">Dimensions: ${i.diameter} x ${i.depth} x ${i.thickness} in.</p>
                                <p class="item">Finish: ${i.finish}</p>
                                <p class="item">Hardware: ${i.hardware}</p>
                                <p class="item">Price: $${i.price}</p>
                            `
                        )
                    }).join(' ')}
                    <hr>
                    <p class="item">Shipping Address: ${order.address}</p>
                    <p class="total">Total: $${order.total}</p>
                </div>
                `
                orderList.insertAdjacentHTML('afterend', html);

            })
        })
    }

    if (orderList.style.display === '') {
        while (orderList.firstChild) {
            orderList.removeChild(orderList.firstChild);
        }
    }

}

const updateButton = document.getElementById('updatebutton');
if (updateButton) updateButton.addEventListener('click', updateAccount);

function updateAccount() {

    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('pswd').value;
    let birthdate = document.getElementById('bdate').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;

    const newInfo = new User(fname, lname, email, password, birthdate, phone, address);

    fetchData('/users/update', {newInfo, userId: user.userId}, "PUT")
    .then((data) => {
        if(!data.message) {
            setCurrentUser(data);
        }
    })
    .catch((error) => {
        const errText = error.message;
        document.getElementById('updateError').innerHTML = errText;
        console.log(`Error! ${errText}`);
    })
}

const toggleButton = document.getElementById('togglepassword');
const password = document.getElementById('pswd')
if (toggleButton) toggleButton.addEventListener('click', togglePassword);

function togglePassword() {
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
}
