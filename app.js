
var x = -505,
    y =  120,
    z =   10,

    angle = 10, 
    speed = 0;

var sizeX = 100;
var sizeY = 60;
var sizeZ = 300;

let img,
    car;


class Objects{

    constructor(x, y, z, sizeX, sizeY, sizeZ, angle, model, texture, scale){
        this.x = x;
        this.y = y;
        this.z = z;

        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sizeZ = sizeZ;

        this.angle = angle;
        this.model = model;
        this.texture = texture;
        this.scale = scale;
    }

};

/*
function collision(Objects o1, Objects o2){

    if(o1.x > o2.x && o1.x + o1.sizeX < o2.x + o2.sizeX &&
       o1.y > o2.y && o1.y + o1.sizeY < o2.y + o2.sizeY && 
       o1.z > o2.z && o1.z + o1.sizeZ < o2.z + o2.sizeZ){

        return 1;
    }
    return 0;

}*/


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

};

var ObjArr=[];
var ObjectCount = 0;

// Create test object
var temp = new Objects(x, y, z, 140, 100, 350, angle, car, img);
ObjArr[ObjArr.length] = temp;
ObjectCount++;


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

    for(var i = 0;i < ObjectCount;i ++){
        push();
        translate(ObjArr[i].x, ObjArr[i].y, ObjArr[i].z);
        rotateZ(PI);
        rotateY(ObjArr[i].angle);
        //scale(ObjArr[i].scale); 
        scale(80);
        fill(255, 255, 0);
        //texture(ObjArr[i].texture);
        //model(ObjArr[i].model);
        model(car);
        pop();
        // HIT BOX
        push();
        translate(ObjArr[i].x, ObjArr[i].y, ObjArr[i].z);
        rotateY(-ObjArr[i].angle);
        box(ObjArr[i].sizeX, ObjArr[i].sizeY, ObjArr[i].sizeZ);
        pop();

    }



    Input();
}
