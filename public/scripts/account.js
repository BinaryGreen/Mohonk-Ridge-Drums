import { logout, getCurrentUser } from './login.js'
import fetchData from './fetchdata.js';

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

const updateButton = document.getElementById('updatebutton');
const editForm = document.getElementById('editaccount');
if (updateButton) updateButton.addEventListener('click', toggleEdit);

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

// todo: fetch PUT to update user info
