// checks if user is logged in. if so, changes 

const link = document.getElementById('account');
const accountButton = document.querySelector('.account');


if (accountButton) accountButton.addEventListener('click', checklogin);

function checklogin() {
    if (localStorage.getItem('user')) {
        link.href = "account.html"
    }
}