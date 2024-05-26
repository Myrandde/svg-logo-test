//global variables
const size = document.getElementById('logo').offsetWidth;
const center = size / 2;
const materSize = size * 0.42;
const toRad = Math.PI / 180;
const ecliptic = 23.4362026703;
let lat = 14.5995;
let long = 120.9842;
const equatorSize = Math.tan((90 * toRad - ecliptic * toRad)/2) * materSize;
let negative = 1;
let maxMag = 5;
let offset = 8;
let cityName = "Manila";
let date = new Date();

function bodyCSS() {
    document.body.style.background = "radial-gradient(black, darkblue)";
    document.body.style.color = "white";
}

function initlogo() {
    let clock = document.getElementById('logo');
    let svgs = ['tropic', 'spiral', 'base', 'ecliptic'];
    for (let i = 0; i < svgs.length; i++) {
        let svgSize = size;
        clock.innerHTML += `<svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" id="${svgs[i]}-svg" width="${svgSize}" height="${svgSize}""></svg>`;
    }
}

function initTropic() {
    const svg = document.getElementById("tropic-svg");
    const Aleph = Math.tan((90 * toRad - ecliptic * toRad) / 2);
    const radius = [materSize, equatorSize, materSize * Aleph * Aleph];

    for (let i = 0; i < radius.length; i++) {
        console.log("Tropic Radius: " + radius[i] + " ");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", center);
        circle.setAttribute("cy", center);
        circle.setAttribute("r", radius[i]);
        circle.setAttribute("fill", "transparent");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", 10);
        svg.appendChild(circle);
    }
}

function initSpiral() {
    // Define the parameters for the spiral
    const svg = document.getElementById("spiral-svg");
    svg.innerHTML = '<path id="spiral-path" d="" fill="none" stroke="black" stroke-width="2"/>';
    const path = document.getElementById('spiral-path');

    const numTurns = 2;
    const maxRadius = size * 0.21;

    // Generate the spiral path
    let pathData = [];
    for (let i = 0; i <= numTurns * Math.PI * 2; i += 0.01) {
        let radius = i / (Math.PI * 2) * maxRadius;
        let x = center + radius * Math.cos(i);
        let y = center + radius * Math.sin(i);
        pathData.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }

    for (let i = 0; i <= numTurns * Math.PI * 2; i += 0.01) {
        let radius = i / (Math.PI * 2) * maxRadius;
        let x = center + radius * Math.cos(i + Math.PI / 2);
        let y = center + radius * Math.sin(i + Math.PI / 2);
        pathData.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }

    // Set the path data
    path.setAttribute('d', pathData.join(' '));
    path.setAttribute('stroke', 'black');
    path.setAttribute('stroke-width', 10);
}

function initEcliptic() {
    const svg = document.getElementById("ecliptic-svg");
    svg.innerHTML = "";

    const radiisize = [1, 0.99];

    for (let i = 0; i < radiisize.length; i++) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const B = Math.tan((90 * toRad + ecliptic * toRad)/2);
    const C = Math.tan((90 * toRad - ecliptic * toRad)/2);
    const BC = (B+C) / 2;
    
    const yc = Math.tan((ecliptic * toRad)) * equatorSize; 
    const xc = 0;
    const r = equatorSize * (BC);

    circle.setAttribute("cx", center + Math.sin((0) * toRad) * yc);
    circle.setAttribute("cy", center + Math.cos((0) * toRad) * yc);
    circle.setAttribute("r", Math.abs(r*radiisize[i]));
    circle.setAttribute("fill","transparent");
    circle.setAttribute("stroke","black");
    circle.setAttribute("stroke-width",7.5);
    svg.appendChild(circle);
    }
}

function initBase() {
    
    // Define the parameters for the spiral
    const svg = document.getElementById("spiral-svg");
    svg.innerHTML = '<path id="spiral-path" d="" fill="none" stroke="black" stroke-width="2"/>';
    const path = document.getElementById('spiral-path');

    const numTurns = 2;
    const maxRadius = size * 0.21;

    // Generate the spiral path
    let xlocs = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150];
    let ylocs = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150];
    let pathData = [];
    for (let i = 0; i < xlocs.length; i++) {
        let radius = i / (Math.PI * 2) * maxRadius;
        let x = center + xlocs[i];
        let y = center + ylocs[i];
        pathData.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }

    // Set the path data
    path.setAttribute('d', pathData.join(' '));
    path.setAttribute('stroke', 'green');
    path.setAttribute('stroke-width', 10);
}


//bodyCSS();
initlogo();
initTropic();
initEcliptic();
initSpiral();
initBase();