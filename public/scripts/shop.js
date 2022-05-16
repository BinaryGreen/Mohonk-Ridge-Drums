import { getCurrentUser } from './login.js'
import fetchData from './fetchdata.js';

let user = getCurrentUser();

renderCart(); 

let id = 10;

class Drum {
    constructor(material, construction, diameter, depth, thickness, finish, hardware) {
        this.drumId = id;
        this.material = material;
        this.construction = construction;
        this.diameter = diameter;
        this.depth = depth;
        this.thickness = thickness;
        this.finish = finish;
        this.hardware = hardware;
        id++
    }
}

let form = document.getElementById('drumForm');
let drumlist = document.getElementById('drumlist');
let errmsg = document.getElementById('errmsg');

if (form) form.addEventListener('submit', checkDimensions);

function checkDimensions(e) { 

    e.preventDefault();
    errmsg.innerHTML = '';

    const msg = 'Depth must be 3 1/2-18 inches. Thickness must be 1/4-4 inches.';
    let d = document.getElementById('depth').value;
    let t = document.getElementById('thickness').value;
    
    if (isNaN(d) || d < 3.5 || d > 18 || isNaN(t) || t < .75 || t > 4) {
        errmsg.innerHTML = msg;
    } else {
        addDrum();
    }
}

function addDrum() {

    errmsg.innerHTML = '';

    let material = document.getElementById('material').value;
    let construction = document.getElementById('construction').value;
    let diameter = document.getElementById('diameter').value;
    let depth = document.getElementById('depth').value;
    let thickness = document.getElementById('thickness').value;
    let finish = document.getElementById('finish').value;
    let hardware = document.getElementById('hardware').value;

    const drum = new Drum(material, construction, diameter, depth, thickness, finish, hardware);

    fetchData('/carts/add', {
        uid: user.user_id,
        material: drum.material,
        construction: drum.construction,
        diameter: drum.diameter,
        depth: drum.depth,
        thickness: drum.thickness,
        finish: drum.finish,
        hardware: drum.hardware
    }, "POST")
    .then(setTimeout(renderCart, 100)); // prevents renderCart from returning data without added drum
}

let nextbutton = document.getElementById('nextbutton');
let cartmsg = document.getElementById('cartmsg');
if (nextbutton) nextbutton.addEventListener('click', checkout);

function checkout(e) {
    e.preventDefault();
    cartmsg.innerHTML = '';

    fetchData('/carts/list', {userId: user.user_id}, "POST")
    .then (data => {
        if (data.length === 0) {
            cartmsg.innerHTML = 'Cart must have at least one item.';
        } else {
            fetchData('/orders/place', {userId: user.user_id, cart: data}, "POST")
            .then (() => {
                alert('Order placed!');
                window.location.href = 'index.html';
            })
        }
    })
}

function renderCart() {
    if (!localStorage.getItem('user')) {
        alert('You must be logged in to use the shop.');
        window.location.href = 'loginor.html';
    }
    else {
        const child = document.querySelectorAll('.cartitem');
        child.forEach(c => {
            c.remove();
        })
        fetchData('/carts/list', {userId: user.user_id}, "POST")
        .then(data => {
            data.forEach((cart, drumId) => {
                let html = 
                `
                <div class="cartitem" id=${cart.item_id}>
                    <button class="deletebutton">x</button>
                    <h1 class="itemheading">Drum # ${drumId + 1}</h1>
                    <hr>
                    <p class="item">Material: ${cart.item_material}</p>
                    <p class="item">Construction: ${cart.item_construction}</p>
                    <p class="item">Dimensions: ${cart.item_diameter} x ${cart.item_depth} x ${cart.item_thickness} in.</p>
                    <p class="item">Finish: ${cart.item_finish}</p>
                    <p class="item">Hardware: ${cart.item_hardware}</p>
                    <p class="item">Price: $${cart.item_price}</p>
                </div>
                `
                drumlist.insertAdjacentHTML('beforeend', html);
            })
        })
        .then(() => {
            const removeButton = document.querySelectorAll('.deletebutton');
            for (let i = 0; i < removeButton.length; i++) {
                if (removeButton[i]) removeButton[i].addEventListener('click', removeItem);
            }
        })
    }
}



function removeItem(e) {
    let targetButton = e.target.parentElement;
    const targetKey = targetButton.id;

    fetchData('/carts/remove', {targetKey}, "DELETE")
    .then(() => {
        drumlist.removeChild(targetButton);
        setTimeout(renderCart, 100);
    })
}

