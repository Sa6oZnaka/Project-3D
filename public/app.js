var socket = io();

var vehs = new Map();
let ObjArr = [];

function preload(){
    // textures

    porscheColors = {
        red : loadImage('assets/Porsche_911_GT2/texture/red.png'),
        green : loadImage('assets/Porsche_911_GT2/texture/green.png'),
        blue : loadImage('assets/Porsche_911_GT2/texture/blue.png'),
        white : loadImage('assets/Porsche_911_GT2/texture/white.png'),
        black : loadImage('assets/Porsche_911_GT2/texture/black.png'),
        yellow : loadImage('assets/Porsche_911_GT2/texture/yellow.png'),
        orange : loadImage('assets/Porsche_911_GT2/texture/orange.png')
    };

    // models
    house = loadModel('assets/Buildings/house.obj');
    car = loadModel('assets/Porsche_911_GT2/Porsche_911_GT2.obj');

}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);

    socket.emit('spawn', "Porsche_911");
}

function Input(obj){
    if (keyIsDown(LEFT_ARROW)) {
        obj.Move("LEFT");
    }
    if (keyIsDown(RIGHT_ARROW)) {
        obj.Move("RIGHT");
    }
    if (keyIsDown(UP_ARROW)) {
        obj.Move("UP");
    }
    if (keyIsDown(DOWN_ARROW)) {
        obj.Move("DOWN");
    }
    socket.emit('update', obj);
};

function CreateSmallHouse(x, y, z, angle){
    let temp = new Building(x, y, z, 660, 700, 840, angle, "Static", "SmallHouse");
    ObjArr.push(temp);
}

// static objects
CreateSmallHouse(1400, 150, -100, 0);
CreateSmallHouse(2200, 150, -100, 0);
//CreateSmallHouse(100, 150, 700, 0);

function draw() {

    /// show something else while the socket is being initialized
    if (!socket.connected || !vehs.has(socket.id)) {
        showLoadingScreen('Connecting...');
        return;
    }

    let myVeh = vehs.get(socket.id);

    directionalLight(255,255, 255,  0, 1, 0);
    directionalLight(255,255, 255,  1, 0, 0);

    camera(myVeh.x, myVeh.y - 100, 400 + myVeh.z, myVeh.x + myVeh.angle, myVeh.y, myVeh.z, 0, 1, 0);

    background(100);

    push();
    //fill(0, 100, 0);
    ambientMaterial(0, 255, 0);
    translate(-275, 175);
    box(100000, 1, 100000);
    pop();

    //noFill();
    stroke(255);

    for(let i = 0;i < ObjArr.length;i ++){
        if(ObjArr[i].id === "SmallHouse"){
            push();
            noStroke();
            translate(ObjArr[i].x - 40, ObjArr[i].y, ObjArr[i].z + 25);
            rotateZ(PI);
            scale(2);
            ambientMaterial(255, 0, 0);
            model(house);
            pop();

            // HITBOX
            push();
            noFill();
            translate(ObjArr[i].x, ObjArr[i].y, ObjArr[i].z);
            box(ObjArr[i].sizeX, ObjArr[i].sizeY, ObjArr[i].sizeZ);
            pop();
        }
    }

    vehs.forEach(function (veh) {

        let colors = [
            porscheColors.red,
            porscheColors.green,
            porscheColors.black,
            porscheColors.yellow,
            porscheColors.black,
            porscheColors.white
        ];

        push();
        translate(veh.getX(), veh.getY(), veh.getZ());
        rotateZ(PI);
        rotateY(veh.getAngle());
        scale(80);
        noStroke();
        texture(colors[veh.getColor()]);
        model(car);
        pop();

        veh.Update();
    });


    Input(myVeh);
}

function showLoadingScreen(message) {
    console.log("Loading...");
}