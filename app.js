
var x = -275,
    y =  175,
    z =   10,

    angle = 0, 
    speed = 0;


var sizeX = 100;
var sizeY = 60;
var sizeZ = 300;

let img;
function preload(){
    //img = loadImage('assets/cube.png');

    car = loadModel('assets/Porsche_911_GT2/Porsche_911_GT2.obj');
    //car = loadModel('assets/huracan in 2.8.obj');
    //car = loadModel('assets/BMW X5 4.obj')

}

function setup() {

    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

var offsetX;
var offsetY;

function Input(){
    if (keyIsDown(LEFT_ARROW)) {
        angle += (speed / 2.5) / 180 * PI;
        speed *= 0.99;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        angle -= (speed / 2.5) / 180 * PI;
        speed *= 0.99;
    }
    if (keyIsDown(UP_ARROW)) {
        speed -= 0.1;
    }
    if (keyIsDown(DOWN_ARROW)) {
        speed += 0.05;
    }

    var lastOffsetX = offsetX;
    var lastOffsetY = offsetY;
    offsetX -= Math.cos(angle) * speed * 2;
    offsetY -= Math.sin(angle) * speed * 2;
    
    myLastX = z;
    myLastY = x;
    z += Math.cos(angle) * speed *2;
    x -= Math.sin(angle) * speed *2;

    speed*=0.987;

}

function draw() {

    let camY = 30; 
    let camX = x;
    let camZ = z;

    camera(camX, camY, 400 + z, x, y, z, 0, 1, 0);

    background(100);

    push();
    translate(x, y, z);
    rotateZ(PI);
    rotateY(angle);
    scale(50);
    fill(0, 102, 153);
    model(car);
    pop();


    noFill();
    stroke(255);
    push();
    translate(500, height * 0.35, -200);
    sphere(300);
    pop();


    Input();
}
