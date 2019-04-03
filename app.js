
var x = -275,
    y =  120,
    z =   10,

    angle = 0, 
    speed = 0;

var sizeX = 100;
var sizeY = 60;
var sizeZ = 300;

let img,
    car;


class SmallHosue{

    constructor(poX, posY){
        this.x = x;
        this.y = y;
    }

    get_x(){
        return this.x;
    }
    get_y(){
        return this.y;
    }
    get_size_x(){
        return this.x;
    }
    get_size_y(){
        return this.y;
    }

};

function collision(){

    //TODO

}

function preload(){
    //img = loadImage('assets/cube.png');

    car = loadModel('assets/Porsche_911_GT2/Porsche_911_GT2.obj');
    img = loadImage('assets/Porsche_911_GT2/skin00/0000-a2.png');

    house = loadModel('assets/house.obj');

}

function setup() {

    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

var offsetX;
var offsetY;

function Input(){
    if (keyIsDown(LEFT_ARROW)) {
        angle += (speed / 3.5) / 180 * PI;
        speed *= 0.99;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        angle -= (speed / 3.5) / 180 * PI;
        speed *= 0.99;
    }
    if (keyIsDown(UP_ARROW)) {
        speed -= 0.2;
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
    z += Math.cos(angle) * speed * 2;
    x -= Math.sin(angle) * speed * 2;

    speed*=0.987;

}

function draw() {

    let camY = 30; 
    let camX = x;
    let camZ = z;

    camera(camX, camY, 400 + z, x+ angle, y, z, 0, 1, 0);

    background(100);


    push();
    translate(x, y, z);
    rotateZ(PI);
    rotateY(angle);
    scale(80);
    fill(0, 102, 153);
    texture(img);
    model(car);
    pop();
    // HIT BOX
    push();
    translate(x, y, z);
    rotateY(-angle);
    box(140, 100, 350);
    pop();


    push();
    fill(0, 255, 0);
    translate(-275, 175);
    //texture(grasstexture);
    box(100000, 1, 100000);
    pop();


    push();
    fill(0, 255, 0);
    translate(-275, 175);
    //rotateY(1.25);
    //rotateX(-0.9);
    box(100000, 1, 100000);
    pop();


    push();
    translate(0, 150, -100);
    rotateZ(PI);
    scale(2);
    fill(0, 102, 153);
    //texture(img);
    model(house);
    pop();
    // HITBOX
    push();
    //fill(0, 255, 255);
    translate(0 + 40, 150, -100 + 25);
    box(660, 700, 840);
    pop();



    noFill();
    stroke(255);
    for(var i = 0;i < 100; i ++){
        push();
        translate(500, height * 0.35, i * -1500);
        sphere(300);
        pop();
    }


    Input();
}
