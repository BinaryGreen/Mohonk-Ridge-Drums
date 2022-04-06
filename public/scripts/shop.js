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
let drums = document.getElementById('drumlist');
let errmsg = document.getElementById('errmsg');

form.addEventListener('submit', checkDimensions);

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

    // append drum properties to <p>, store inside individual <div>, append to overall <div>

    let drumitem = document.createElement('div');
    let drumitemcontent = document.createElement('p');

    drumitem.className = 'drumitem';
    drumitemcontent.className = 'drumitemcontent';

    let string = document.createTextNode(
        `
        Material: ${drum.material}, 
        Construction: ${drum.construction}, 
        Size: ${drum.diameter} x ${drum.depth} x ${drum.thickness}, 
        Finish: ${drum.finish}, 
        Hardware: ${drum.hardware}
        `
    );
    drumitemcontent.appendChild(string);
    drumitem.appendChild(drumitemcontent);
    drums.appendChild(drumitem);
    console.log(drums);
}

// add event listener that checks if cart is empty before proceeding

