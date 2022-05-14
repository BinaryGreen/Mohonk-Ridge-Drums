import { logout, setCurrentUser, getCurrentUser } from './login.js'
import fetchData from './fetchdata.js';

class User {
    constructor(fname, lname, email, password, birthdate, phone, address) { // new account info
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
        fetchData('/users/delete', {userId: user.user_id}, "DELETE")
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
        fetchData('/users/edit', {userId: user.user_id}, "POST")
        .then((data) => {
            if(!data.message) {
                fname.value = data[0].user_firstname;
                lname.value = data[0].user_lastname;
                email.value = data[0].user_email;
                password.value = data[0].user_password;
                birthdate.value = data[0].user_birthdate;
                phone.value = data[0].user_phone;
                address.value = data[0].user_address;
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
const orderBox = document.getElementById('orders');
if (openhistory) openhistory.addEventListener('click', toggleHistory);

function toggleHistory() {
    orderList.style.display = ! orderList.style.display ? 'block' : ''; 

    if (orderList.style.display === 'block') {
        fetchData('/orders/list', {userId: user.user_id}, "POST")
        .then(data => {
            console.log(data);
            data.forEach(order => {
                let html = 
                `
                <div class="singleOrder">
                    <h1 class="orderheading">Order # ${order.orderId}</h1> <hr>
                    ${order.allProducts.map((i, drumId) => {
                        return (
                            `
                                <h2 class="drumheading">Drum # ${drumId + 1}:</h2>
                                <p class="item">Material: ${i.item_material}</p>
                                <p class="item">Construction: ${i.item_construction}</p>
                                <p class="item">Dimensions: ${i.item_diameter} x ${i.item_depth} x ${i.item_thickness} in.</p>
                                <p class="item">Finish: ${i.item_finish}</p>
                                <p class="item">Hardware: ${i.item_hardware}</p>
                                <p class="item">Price: $${i.item_price}</p>
                            `
                        )
                    }).join(' ')}
                    <hr>
                    <p class="item">Date Ordered: ${order.date}</p>
                    <p class="item">Shipping Address: ${order.address}</p>
                    <p class="total">Total: $${order.total}</p>
                </div>
                `
                orderBox.insertAdjacentHTML('afterend', html);

            })
            if (data.length === 0) {
                let noOrders = 
                `
                    <div class="singleOrder">
                        <p id="noOrders">You have no orders. Order your first drum at our <b><a href="shop.html">shop</a></b>.</p>
                    </div>
                `
                orderList.insertAdjacentHTML('afterend', noOrders);
            }

        })
    }

    if (orderList.style.display === '') {
        const child = document.querySelectorAll('.singleOrder');
        child.forEach(c => {
            c.remove();
        })
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

    fetchData('/users/update', {newInfo, userId: user.user_id}, "PUT")
    .then((data) => {
        if(!data.message) {
            setCurrentUser(data);
            alert('Account info updated!');
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
