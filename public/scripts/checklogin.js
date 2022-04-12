// checks if user is not logged in. if so, changes href to redirect to login page

const link = document.getElementById('account');
const accountButton = document.querySelector('.account');


if (accountButton) accountButton.addEventListener('click', checklogin);

function checklogin() {
    if (!localStorage.getItem('user')) {
        link.href = "loginor.html";
    } else {
        link.href = "account.html";
    }
}