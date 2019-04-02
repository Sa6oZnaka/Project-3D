
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
    img = loadImage('assets/cube.png');

    car = loadModel('assets/Porsche_911_GT2/Porsche_911_GT2.obj');
    //car = loadModel('assets/huracan in 2.8.obj');

    //car = loadModel('assets/BMW X5 4.obj')

}

function setup() {

    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

function Input(){
    if (keyIsDown(LEFT_ARROW)) {
        angle -= PI / 18;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        angle += PI / 18;
    }
    if (keyIsDown(UP_ARROW)) {
        speed -= 0.5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        speed += 0.5;
    }
}

function draw() {

    if(angle != 0){
        if(angle > 0){
            x -= speed * angle;
            angle -= (speed * angle)/10;
        }else{
            x += speed * angle;
            angle += (speed * angle)/10;
        }
    }

    z += speed;
    speed = speed / 1.02;

    let camY = 30; 
    let camX = x;//map(mouseX, 0, width, -200, 0);
    let camZ = z;

    //camera(camX, camY, (height/2) / tan(PI/6), x, y, z, 0, 1, 0);
    camera(camX, camY, 400 + z, x, y, z, 0, 1, 0);



    background(100);

    //noStroke();
    //fill(50);
    push();
    translate(x, y, z);
    rotateZ(PI);
    rotateY(angle);
    //texture(img);

    scale(50);
    //model(car);
    //box(sizeX, sizeY, sizeZ);
        //pop();

    //normalMaterial(255);

    //background(200);
      //rotateX(frameCount * 0.01);
      //rotateY(frameCount * 0.01);
    model(car);
    //normalMaterial(255);



    pop();


    noFill();
    stroke(255);
    push();
    translate(500, height * 0.35, -200);
    sphere(300);
    pop();


    Input();
}