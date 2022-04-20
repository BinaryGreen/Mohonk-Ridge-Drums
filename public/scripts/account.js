import logout from './login.js'

const logoutButton = document.getElementById('logoutbutton');

if (logoutButton) logoutButton.addEventListener('click', logout);