// checks if user is logged in. if so, changes href to redirect to account page

const link = document.getElementById('account');
const accountButton = document.querySelector('.account');


if (accountButton) accountButton.addEventListener('click', checklogin);

function checklogin() {
    if (localStorage.getItem('user')) {
        link.href = "account.html"
    }
}