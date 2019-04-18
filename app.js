class Objects{

    constructor(x, y, z, sizeX, sizeY, sizeZ, angle, type, id){
        this.x = x;
        this.y = y;
        this.z = z;

        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sizeZ = sizeZ;

        this.angle = angle;
        this.type  = type;
        this.id    = id;
    }

};

class Movable extends Objects{

    constructor(x, y, z, sizeX, sizeY, sizeZ, angle, type, id, speed){
        super(x, y, z, sizeX, sizeY, sizeZ, angle, type, id);

        this.speed = 0;
    }

    Move(direction){
        
        if(direction == "LEFT"){
            this.angle += (this.speed / 3.5) / 180 * PI;
            this.speed *= 0.99;
        }
        if(direction == "RIGHT"){
            this.angle -= (this.speed / 3.5) / 180 * PI;
            this.speed *= 0.99;   
        }
        if(direction == "UP"){
            this.speed -= 0.06;
        }
        if(direction == "DOWN"){
            this.speed += 0.04;   
        }
    }

    Update(){
        this.z += Math.cos(this.angle) * this.speed * 2;
        this.x -= Math.sin(this.angle) * this.speed * 2;

        this.speed *= 0.993;
    }

};

var a = 50;
function collision(o1, o2){

    //console.log(o1.x , ">" , o2.x , " && " , o1.sizeX , " + " , o1.sizeX , " < " , o2.x , "+ " , o2.sizeX);

    if(o1.x > o2.x - o2.sizeX - 350 && o1.x < o2.x + o2.sizeX + 350 &&
       o1.z > o2.z - o2.sizeZ - 330 && o1.z < o2.z + o2.sizeZ + 330){
        ObjArr[0].speed = -ObjArr[0].speed;


        return 1;
    }
    return 0;

}

function preload(){
    // textures
    img = loadImage('assets/Porsche_911_GT2/skin00/0000-a2.png');

    // models
    house = loadModel('assets/house.obj');
    car = loadModel('assets/Porsche_911_GT2/Porsche_911_GT2.obj');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

var ObjArr=[];
var ObjectCount = 0;

function Input(){
    if (keyIsDown(LEFT_ARROW)) {
        ObjArr[0].Move("LEFT");
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ObjArr[0].Move("RIGHT");
    }
    if (keyIsDown(UP_ARROW)) {
        ObjArr[0].Move("UP");
    }
    if (keyIsDown(DOWN_ARROW)) {
        ObjArr[0].Move("DOWN");
    }
};

function CreateSmallHouse(x, y, z, angle){
    var temp = new Objects(x, y, z, 660, 700, 840, angle, "Static", "SmallHouse");
    ObjArr.push(temp);
}

// Create dynamic object
var temp = new Movable(-505, 120, 10, 140, 100, 350, 30, "dynamic", "Porsche_911_GT2", 2);
ObjArr.push(temp);

// static objects
CreateSmallHouse(1400, 150, -100, 0);
CreateSmallHouse(2200, 150, -100, 0);
CreateSmallHouse(100, 150, 700, 0);

function draw() {
    
    // Collision //
    for(var i = 0; i < ObjArr.length; i ++){
        if(ObjArr[i].type == "dynamic"){
            for(var j = 0; j < ObjArr.length; j ++){
                if(i != j){
                    collision(ObjArr[j], ObjArr[i]);
                }
            }
        }
    }
    
    for(var i = 0; i < ObjArr.length;i ++){
        if(ObjArr[i].type == "dynamic"){
            ObjArr[i].Update();
        }
    }    
        
    camera(ObjArr[0].x, ObjArr[0].y - 100, 400 + ObjArr[0].z, ObjArr[0].x + ObjArr[0].angle, ObjArr[0].y, ObjArr[0].z, 0, 1, 0);

    background(100);

    push();
    fill(0, 255, 0);
    translate(-275, 175);
    box(100000, 1, 100000);
    pop();

    noFill();
    stroke(255);

    for(var i = 0;i < ObjArr.length;i ++){
    
        if(ObjArr[i].type == "dynamic"){
            if(ObjArr[i].id == "Porsche_911_GT2"){
                push();
                translate(ObjArr[i].x, ObjArr[i].y, ObjArr[i].z);
                rotateZ(PI);
                rotateY(ObjArr[i].angle); 
                scale(80);
                fill(255, 255, 0);
                model(car);
                pop();
                // HIT BOX
                push();
                translate(ObjArr[i].x, ObjArr[i].y, ObjArr[i].z);
                rotateY(-ObjArr[i].angle);
                box(ObjArr[i].sizeX, ObjArr[i].sizeY, ObjArr[i].sizeZ);
                pop();
            }    
        }else{
            if(ObjArr[i].id == "SmallHouse"){        
                push();
                translate(ObjArr[i].x - 40, ObjArr[i].y, ObjArr[i].z + 25);
                rotateZ(PI);
                scale(2);
                fill(0, 102, 153);
                //texture(img);
                model(house);
                pop();
                // HITBOX
                push();
                //fill(0, 255, 255);
                translate(ObjArr[i].x, ObjArr[i].y, ObjArr[i].z);
                box(ObjArr[i].sizeX, ObjArr[i].sizeY, ObjArr[i].sizeZ);
                pop();        
            }    
        }
    }

    Input();
}
