
var x = -275,
    y =  175;


let img;
function preload(){
    img = loadImage('assets/cube.png');
}

function setup() {

    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

function Input(){
    if (keyIsDown(LEFT_ARROW)) {
        x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        y += 5;
    }
}

function draw() {

    background(100);

    noStroke();
    fill(50);
    push();
    translate(x, y);
    //rotateY(1.25);
    //rotateX(-0.9);
    texture(img);
    box(200, 200, 200);
    pop();


    noFill();
    stroke(255);
    push();
    translate(500, height * 0.35, -200);
    sphere(300);
    pop();


    Input();
}