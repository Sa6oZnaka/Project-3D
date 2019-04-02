var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) { setTimeout (callback, 1000 / 30); };

var canvas = document.getElementById("canvas-id");
canvas.width = screen.width;
canvas.height = screen.height;
var context = canvas.getContext("2d");
var Treva = new Image();Treva.src="Treva.jpg";
var testX,testY;
var isKeyDown=[];
function create2dArray(lengthX,lengthY,value) {
    var array2d = [];
    for (var i = 0; i < lengthX; i++) {
        array2d[i] a= [];
        for (var j = 0; j < lengthY; j++) {
            array2d[i][j] = value;
        }
    }
    return array2d;
}
var UNLOCKLEVALS=[];
UNLOCKLEVALS[1]=true;
UNLOCKLEVALS[2]=false;
UNLOCKLEVALS[3]=false;
UNLOCKLEVALS[4]=false;
UNLOCKLEVALS[5]=false;
UNLOCKLEVALS[6]=false;
UNLOCKLEVALS[7]=false;
UNLOCKLEVALS[8]=false;
UNLOCKLEVALS[9]=false;
UNLOCKLEVALS[10]=false;
var LOGO1,LOGO2;
var MENU=true;
var LT=0;


var HEADMENU=true;
var HMI=new Image();HMI.src="MENU.png";

var LOG1=new Image();LOG1.src="Logo.png";

var RoadI=new Image();RoadI.src="Road.png";
function rand(d){
    return Math.floor(Math.random()*d);
}

var mazeSize=60;
var maze = create2dArray(mazeSize,mazeSize,0);
var Dirt = new Image();Dirt.src="Dirt.jpg";
var stackX=[],stackY=[],stackcount=0;

function createStack(x,y){
    stackX[stackcount]=x;
    stackY[stackcount]=y;
    stackcount++;
    //console.log("stackcount: ",stackcount);
}
var Car=1;
function isFree(x,y){
    
}
var Level = 4;
//Level=prompt();
function mazeGenerator(x,y){
    //console.log("x,y,stackcount" + x,y,stackcount);
    if(x>=mazeSize-1 || x<=0 || y>=mazeSize-1 || y<=0){
        return;
    }
    //console.log(x,y);
    maze[x][y]=1;
    
    
    
    var b=0
    var possiblecount=0;
    var possibleX=[0,0,0,0];
    var possibleY=[0,0,0,0];
    if(isFree(x+1,y)){
        possiblecount++;
        possibleX[b]=x+1;
        possibleY[b]=y;
        b++;
    }
    if(isFree(x-1,y)){
        possiblecount++;         
        possibleX[b]=x-1;
        possibleY[b]=y;
        b++;
    }
    if(isFree(x,y+1)){
        possiblecount++;
        possibleX[b]=x;
        possibleY[b]=y+1;
        b++;
    }
    if(isFree(x,y-1)){
        possiblecount++;
        possibleX[b]=x;
        possibleY[b]=y-1;
        b++;
    }
    if(possiblecount>0){
        //console.log("here" + stackcount);
        //console.log("if: "+x,y);
        //createStack(x,y);
        var a=rand(possiblecount);
        maze[possibleX[a]][possibleY[a]];
        createStack(possibleX[a],possibleY[a]);
        mazeGenerator(possibleX[a],possibleY[a]);
    }else{
        if(stackcount>1){
            stackcount-=1;
            mazeGenerator(stackX[stackcount],stackY[stackcount]);
        }
    }
}
for(var i=0;i<mazeSize;i++){ 
    maze[i][0]=1;
    maze[i][mazeSize-1]=1;
    maze[0][i]=1;
    maze[mazeSize-1][i]=1;
}
mazeGenerator(mazeSize-10,mazeSize-10);


for(testY=0;testY<mazeSize;testY++){
    for(testX=0;testX<mazeSize;testX++){
        maze[testY][testX]=0;
    }
}


//maze[2][3]=1;
//maze[2][2]=1;
//maze[3][2]=1;




//////





// MAZE GENERATOR <-----------------------------------------------------------------------------------------------------------------
// RACE GENERATOR <-----------------------------------------------------------------------------------------------------------------



//maze[3][3]=2;
var roadSize=100;
var miniroadSize=3;
var carSize=50;

var timer = 0;

var PRESTOCONTINUE=true;
var PRESMENU=new Image();PRESMENU.src="MENU START.jpg"


var myX=2*roadSize + roadSize/2,myY=roadSize*2 + roadSize/2,myRottation=0,mySpeed=0,myLastX=myY,myLastY=myY;
var offsetX=-(2*roadSize + roadSize/2) + canvas.width/2, offsetY=-(roadSize*2 + roadSize/2) + canvas.height/2,lastOffsetX=offsetX,lastOffsetY=offsetY;

var isImWin=false;
var mouseX=0,mouseY=0;

var myCar=new Image;
myCar.src="car.png";

var Car2=new Image();Car2.src="car2.png";
var Car3=new Image();Car3.src="car3.png";
var Car4=new Image();Car4.src="car4.png";
var Car5=new Image();Car5.src="car5.png";

var Road2=new Image();Road2.src="Road2.png";
/*var carType1 = new Image;
carType1.src = "cars_mini.png";

var carType2 = new Image;
carType2.src = "cars_racer.png";

var carType3 = new Image;
carType3.src = "dacia.png";

var carType4 = new Image;
carType4.src = "TRBRYcars_[Converted_pickup_0.png";

var carType5 = new Image;
carType5.src = "TRBRYcars_[Converted_sedan.png";*/

function car(){
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.speed = 1;
    var a = Math.random(Math.floor(5));
    if(a==0){
        this.type = carType1;
    }
    if(a==1){
        this.type = carType2;
    }
    if(a==2){
        this.type = carType3;
    }
    if(a==3){
        this.type = carType4;
    }
    if(a==4){
        this.type = carType5;
    }
}

//bot = new car();

var isKeyDown=[];
window.addEventListener("keydown", function (args) {
    isKeyDown[args.keyCode]=true;
}, false);

window.addEventListener("keyup", function (args) {
    isKeyDown[args.keyCode]=false;
}, false);
/*window.addEventListener("mousemove", function (args) {
    mouseX = args.pageX - canvas.offsetLeft;
    mouseY = args.pageY - canvas.offsetTop;
}, false);*/

var TSTI;
//HEADMENU=true;
window.addEventListener("keydown", function (args) {  //Vika se pri natiskane na kopche
    if(LT>100){
        PRESTOCONTINUE=false;
        
    }
    
    if(HEADMENU){
        if(args.keyCode!=48){
        
        for(TSTI=1;TSTI<10;TSTI++){
            if(args.keyCode==48+TSTI && args.keyCode!=48){
                if(UNLOCKLEVALS[TSTI]){
                    Level=TSTI;
                    HEADMENU=false;
                    Clear=true
                }else{
                    alert("You not unlock this level !");   
                }
            }
        }
        }else{
          //  HEADMENU=true;    
        }
        if(args.keyCode==48 && UNLOCKLEVALS[TSTI]){
            Level=10;
            HEADMENU=false;
            Clear=true;
        }
        //timer=0;
    }
}, false);

var CLX,CLY;
var Clear=false;



function myMove(){
    
    if(isKeyDown[37]){
        myRottation-=(mySpeed/2.5);
        mySpeed*=0.99;
    }
    if(isKeyDown[39]){
        myRottation+=(mySpeed/2.5);
        mySpeed*=0.99;
    }
    if(isKeyDown[38]){
        mySpeed+=0.1;
    }
    if(isKeyDown[40]){
        if(mySpeed>0){
            mySpeed/=1.2;
            mySpeed-=0.001;
        }else{
            mySpeed-=0.05;
        }
    }
    if(isKeyDown[65]){
        mySpeed+=0.2;
    }
    if(isKeyDown[32]){
        mySpeed*=0.8;
    }
    mySpeed*=0.987;

    for(var y=0;y<mazeSize;y++){
        for(var x=0;x<mazeSize;x++){
            if((x*roadSize + offsetX)<canvas.width && (x*roadSize + offsetX)>-roadSize && (y*roadSize + offsetY)<canvas.height && (y*roadSize + offsetY)>-roadSize){
                if(maze[x][y]==0 && !greedIsGood){
                    if(!carColision(x,y)){
                        greedIsGood=true;
                    }
                }
            }
        }
    }
    if(greedIsGood){
        mySpeed*=-0.8;
        myX=myLastX;
        myY=myLastY;
        offsetX=lastOffsetX;
        offsetY=lastOffsetY;
    }

    if(!carColision(mazeSize-3,mazeSize-3) && Level == 1){
        isImWin=true;
        HEADMENU=true;
        if(timer/1000<50){
            UNLOCKLEVALS[2]=true;
        }
    }
    
    //if(!carColision(25,48 && Level==2)){
    if(!carColision(48,25) && Level == 2){
        isImWin=true;HEADMENU=true;
        if(timer/1000<25){
            UNLOCKLEVALS[3]=true;
        }else{
            //alert("Sorry time is over :( !!!")   ;
            //timer=0;
        }
    }
    if(!carColision(46,2) && Level == 3){
        isImWin=true;HEADMENU=true;
        if(timer/1000<16){
            UNLOCKLEVALS[4]=true;
        }
    }
    if(!carColision(58,2) && Level == 4){
        isImWin=true;HEADMENU=true;
        if(timer/1000<10){
            UNLOCKLEVALS[5]=true;
        }
    }
    if(!carColision(58,2) && Level == 5){
        isImWin=true;HEADMENU=true;
        if(timer/1000<10){
            UNLOCKLEVALS[6]=true;
        }
    }
    if(!carColision(58,2) && Level == 6){
        isImWin=true;HEADMENU=true;
        if(timer/1000<10){
            UNLOCKLEVALS[7]=true;
        }
    }
    
    //if(!carColision(58,2) && Level == 6){
    //    isImWin=true;HEADMENU=true;
    //    UNLOCKLEVALS[8]=true;
    //}
    
    if(!carColision(23,28) && Level == 7){
        
        isImWin=true;HEADMENU=true;
        if(timer/1000<24){
            UNLOCKLEVALS[8]=true;
        }
    }
    if(!carColision(2,5) && Level == 8){
        isImWin=true;
        HEADMENU=true;
        if(timer/1000<52){
            UNLOCKLEVALS[9]=true;
        }
    }
    if(!carColision(2,4) && Level == 9){
        isImWin=true;HEADMENU=true;
        if(timer/1000<134){
            UNLOCKLEVALS[10]=true;
        }
    }
    if(!carColision(48,25) && Level == 10){
        isImWin=true;HEADMENU=true;
        if(timer/1000<15){
            alert("YOU COMPLEAT ALL GAMES");
            alert("THANKS FOR PLAY Mega Speed Oneline I");
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    lastOffsetX=offsetX;
    lastOffsetY=offsetY;
    offsetX-=Math.cos(myRottation/180*Math.PI) * mySpeed*2;
    offsetY-=Math.sin(myRottation/180*Math.PI) * mySpeed*2;
    
    myLastX=myX;
    myLastY=myY;
    myX+=Math.cos(myRottation/180*Math.PI) * mySpeed*2;
    myY+=Math.sin(myRottation/180*Math.PI) * mySpeed*2;
}

var greedIsGood=false;
function carColision(x,y){

    if(x*roadSize<myX - Math.cos((myRottation+22)/180*Math.PI)*carSize && x*roadSize + roadSize>myX - Math.cos((myRottation+22)/180*Math.PI)*carSize){
    if(y*roadSize<myY - Math.sin((myRottation+22)/180*Math.PI)*carSize && y*roadSize + roadSize>myY - Math.sin((myRottation+22)/180*Math.PI)*carSize){
        return false;
    }
    }

    if(x*roadSize<myX + Math.cos((myRottation+22)/180*Math.PI)*(carSize-2) && x*roadSize + roadSize>myX + Math.cos((myRottation+22)/180*Math.PI)*(carSize-2)){
    if(y*roadSize<myY + Math.sin((myRottation+22)/180*Math.PI)*(carSize-2) && y*roadSize + roadSize>myY + Math.sin((myRottation+22)/180*Math.PI)*(carSize-2)){
        return false;
    }
    }

    if(x*roadSize<myX - Math.cos((myRottation-22)/180*Math.PI)*carSize && x*roadSize + roadSize>myX - Math.cos((myRottation-22)/180*Math.PI)*carSize){
    if(y*roadSize<myY - Math.sin((myRottation-22)/180*Math.PI)*carSize && y*roadSize + roadSize>myY - Math.sin((myRottation-22)/180*Math.PI)*carSize){
        return false;
    }
    }

    if(x*roadSize<myX + Math.cos((myRottation-22)/180*Math.PI)*(carSize-2) && x*roadSize + roadSize>myX + Math.cos((myRottation-22)/180*Math.PI)*(carSize-2)){  
    if(y*roadSize<myY + Math.sin((myRottation-22)/180*Math.PI)*(carSize-2) && y*roadSize + roadSize>myY + Math.sin((myRottation-22)/180*Math.PI)*(carSize-2)){
        return false;
    }
    }

    if(x*roadSize<myX - Math.cos((myRottation)/180*Math.PI)*carSize && x*roadSize + roadSize>myX - Math.cos((myRottation)/180*Math.PI)*carSize){
    if(y*roadSize<myY - Math.sin((myRottation)/180*Math.PI)*carSize && y*roadSize + roadSize>myY - Math.sin((myRottation)/180*Math.PI)*carSize){
        return false;
    }
    }
    
    if(x*roadSize<myX + Math.cos((myRottation)/180*Math.PI)*carSize && x*roadSize + roadSize>myX + Math.cos((myRottation)/180*Math.PI)*carSize){
    if(y*roadSize<myY + Math.sin((myRottation)/180*Math.PI)*carSize && y*roadSize + roadSize>myY + Math.sin((myRottation)/180*Math.PI)*carSize){
        return false;
    }
    }
    
    if(x*roadSize<myX + Math.cos((myRottation*-1 - 90+20)/180*Math.PI)*carSize/2 && x*roadSize + roadSize>myX + Math.cos((myRottation*-1 - 90+20)/180*Math.PI)*carSize/2){
    if(y*roadSize<myY - Math.sin((myRottation*-1 - 90+20)/180*Math.PI)*carSize/2 && y*roadSize + roadSize>myY - Math.sin((myRottation*-1 - 90+20)/180*Math.PI)*carSize/2){
        return false;
    }
    }

    if(x*roadSize<myX - Math.cos((myRottation*-1 - 90-20)/180*Math.PI)*carSize/2 && x*roadSize + roadSize>myX - Math.cos((myRottation*-1 - 90-20)/180*Math.PI)*carSize/2){
    if(y*roadSize<myY + Math.sin((myRottation*-1 - 90-20)/180*Math.PI)*carSize/2 && y*roadSize + roadSize>myY + Math.sin((myRottation*-1 - 90-20)/180*Math.PI)*carSize/2){
        return false;
    }
    }

    if(x*roadSize<myX + Math.cos((myRottation*-1 - 90-25)/180*Math.PI)*carSize/2 && x*roadSize + roadSize>myX + Math.cos((myRottation*-1 - 90-25)/180*Math.PI)*carSize/2){
    if(y*roadSize<myY - Math.sin((myRottation*-1 - 90-25)/180*Math.PI)*carSize/2 && y*roadSize + roadSize>myY - Math.sin((myRottation*-1 - 90-25)/180*Math.PI)*carSize/2){
        return false;
    }
    }

    if(x*roadSize<myX - Math.cos((myRottation*-1 - 90+25)/180*Math.PI)*carSize/2 && x*roadSize + roadSize>myX - Math.cos((myRottation*-1 - 90+25)/180*Math.PI)*carSize/2){
    if(y*roadSize<myY + Math.sin((myRottation*-1 - 90+25)/180*Math.PI)*carSize/2 && y*roadSize + roadSize>myY + Math.sin((myRottation*-1 - 90+25)/180*Math.PI)*carSize/2){
        return false;
    }
    }

    return true;
}

function update() {
    if(isKeyDown[77] && miniroadSize<10){
        miniroadSize++;
    }
    if(!isKeyDown[77] && miniroadSize>6){
        miniroadSize--;
    }
    
    if(Clear){
        offsetX=-(2*roadSize + roadSize/2) + canvas.width/2; offsetY=-(roadSize*2 + roadSize/2) + canvas.height/2;lastOffsetX=offsetX;lastOffsetY=offsetY;
        myX=2*roadSize + roadSize/2;myY=roadSize*2 + roadSize/2;myRottation=0;mySpeed=0;myLastX=myY;myLastY=myY;
        
        for(CLY=0;CLY<mazeSize;CLY++){
            for(CLX=0;CLX<mazeSize;CLX++){
                if(CLY!=2 || CLX!=2){
                    maze[CLY][CLX]=0;
                }
            }
        }
        isImWin=false;
        timer=0;
        Clear=false;
        
    }
    
    
    myMove();
    if(!isImWin){
        timer+=20;
    }
    
    LT++;
    
    setTimeout(update, 20);
}

function rotateImage(image, clipX, clipY, clipWidth, clipHeight, x, y, width, height, angle) {
    x=x-width/2;
    y=y-height/2;
    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate(angle * Math.PI / 180);
    context.drawImage(image, clipX, clipY, clipWidth, clipHeight, -1* (width / 2), -1 * (height / 2), width, height);
    context.rotate((360 - angle) * Math.PI / 180);
    context.restore();
}

function drawArc(x,y,size,fill){
    context.beginPath();
    context.arc( x, y,size,0,2*Math.PI);
    context.closePath();
    if(fill=="fill"){context.fill();}
    if(fill=="stroke"){context.stroke();}
}

function draw() {

    context.globalAlpha = 1;
    context.fillStyle = "#080";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    
    for(var y=0;y<mazeSize;y++){
        for(var x=0;x<mazeSize;x++){
            if((x*roadSize + offsetX)<canvas.width && (x*roadSize + offsetX)>-roadSize && (y*roadSize + offsetY)<canvas.height && (y*roadSize + offsetY)>-roadSize){
                if(maze[x][y]==0){
                    //context.fillStyle = "#888";
                    //context.fillRect(x*roadSize + offsetX, y*roadSize + offsetY, roadSize+0.6, roadSize+0.6);
                    
                    context.drawImage(Treva,x*roadSize + offsetX, y*roadSize + offsetY, roadSize+0.6, roadSize+0.6);
                }
                
                if(maze[x][y]==1){
                    //context.fillStyle = "#888";
                    //context.fillRect(x*roadSize + offsetX, y*roadSize + offsetY, roadSize+0.6, roadSize+0.6);
                    
                    context.drawImage(RoadI,x*roadSize + offsetX, y*roadSize + offsetY, roadSize+0.6, roadSize+0.6);
                }
                if(maze[x][y]==2){
                    context.fillStyle = "green";
                    context.fillRect(x*roadSize + offsetX, y*roadSize + offsetY, roadSize+0.6, roadSize+0.6);
                }
                if(maze[x][y]==3){
                    context.drawImage(Dirt,x*roadSize + offsetX, y*roadSize + offsetY, roadSize+0.6, roadSize+0.6);
                }
                
                if(maze[x][y]==5){
                    context.drawImage(Road2,x*roadSize + offsetX, y*roadSize + offsetY, roadSize+0.6, roadSize+0.6);
                }
                if(maze[x][y]==7){
                    context.fillStyle = "gray";
                    context.fillRect(x*roadSize + offsetX, y*roadSize + offsetY, roadSize+0.6, roadSize+0.6);
                }
            }
        }
    }
    greedIsGood=false;
    
    
    
    if(Car==1){
        rotateImage(myCar, 0, 0, myCar.width, myCar.height, myX + offsetX, myY + offsetY, carSize*2, carSize, myRottation);
    }
    if(Car==2){
        rotateImage(Car2, 0, 0, Car2.width, Car2.height, myX + offsetX, myY + offsetY, carSize*2, carSize, myRottation);
    }
    if(Car==3){
        rotateImage(Car3, 0, 0, Car3.width, Car3.height, myX + offsetX, myY + offsetY, carSize*2, carSize, myRottation);
    }
    if(Car==4){
        rotateImage(Car4, 0, 0, Car4.width, Car4.height, myX + offsetX, myY + offsetY, carSize*2, carSize, myRottation);
    }
    if(Car==5){
        rotateImage(Car5, 0, 0, Car5.width, Car5.height, myX + offsetX, myY + offsetY, carSize*2, carSize, myRottation);
    }
    //////////////////////////////////////////////////////////////////
    context.fillStyle = "#000";
    context.fillRect(miniroadSize, miniroadSize+570, mazeSize*miniroadSize, mazeSize*miniroadSize);
    for(var y=0;y<mazeSize;y++){
        for(var x=0;x<mazeSize;x++){
            //if((x*roadSize + offsetX)<canvas.width && (x*roadSize + offsetX)>-roadSize && (y*roadSize + offsetY)<canvas.height && (y*roadSize + offsetY)>-roadSize){
            if(maze[x][y]==1 || maze[x][y]==5){
                context.fillStyle = "#AAA";
                context.fillRect(x*miniroadSize + miniroadSize, y*miniroadSize + miniroadSize+570, miniroadSize, miniroadSize);
            }
            if(maze[x][y]==2){
                context.fillStyle = "green";
                context.fillRect(x*miniroadSize + miniroadSize, y*miniroadSize + miniroadSize+570, miniroadSize, miniroadSize);
            }
            if(maze[x][y]==3){
                context.fillStyle = "brown";
                context.fillRect(x*miniroadSize + miniroadSize, y*miniroadSize + miniroadSize+570, miniroadSize, miniroadSize);
            }
            
            if(maze[x][y]==7){
                context.fillStyle = "gray";
                context.fillRect(x*miniroadSize + miniroadSize, y*miniroadSize + miniroadSize+570, miniroadSize, miniroadSize);
            }
            
            //}
        }
    }

    
    context.fillStyle = "#CCC";
    context.fillRect(canvas.width - 100    , canvas.height - 50, 100,100);
    
    
    context.fillStyle = "#800";
    context.font = "18px Arial";
    context.fillText(Math.floor(Math.abs(mySpeed*10) * 1.61) + " km/h", canvas.width - 80    , canvas.height - 10);
    if(!isImWin){
        context.fillText(Math.floor(timer/1000) + " sec",canvas.width - 80    , canvas.height - 30);
    }
    
    
    
    
    
    
    
    if(HEADMENU){
        context.drawImage(HMI,0,0,canvas.width,canvas.height);   
    }
    if(LT<100){
        context.drawImage(LOG1,0,0,canvas.width,canvas.height);   
    }else{
        if(PRESTOCONTINUE){
               context.drawImage(PRESMENU,0,0,canvas.width,canvas.height);   
        }
    }
    if(isImWin){
        //context.fillStyle = "#F00";
        //context.font = "72px Arial";
        //context.fillText("You Win!", 400, 300);
        //context.fillText(timer/1000,400,380);
        
        
    }
    
    
    
    
    
    
    context.fillStyle = "#000";
    drawArc(myX/(roadSize/miniroadSize) + miniroadSize, myY/(roadSize/miniroadSize) + miniroadSize+570, miniroadSize/3, "fill");
    
    /*context.strokeStyle = "#fff";
    drawArc(mouseX,mouseY,10,"stroke");*/
    requestAnimationFrame(draw);
}
update();
draw();
            
    //context.fillStyle = "#00f";
    //drawArc(myX + offsetX, myY + offsetY,5,"fill");
    //context.strokeStyle = "#fff";
    
    /*drawArc(myX + offsetX - Math.cos((myRottation+22)/180*Math.PI)*carSize, myY + offsetY - Math.sin((myRottation+22)/180*Math.PI)*carSize,5,"stroke");
    drawArc(myX + offsetX + Math.cos((myRottation+22)/180*Math.PI)*(carSize-2), myY + offsetY + Math.sin((myRottation+22)/180*Math.PI)*(carSize-2),5,"stroke");

    drawArc(myX + offsetX - Math.cos((myRottation-22)/180*Math.PI)*carSize, myY + offsetY - Math.sin((myRottation-22)/180*Math.PI)*carSize,5,"stroke");
    drawArc(myX + offsetX + Math.cos((myRottation-22)/180*Math.PI)*(carSize-2), myY + offsetY + Math.sin((myRottation-22)/180*Math.PI)*(carSize-2),5,"stroke");
    
    drawArc(myX + offsetX - Math.cos((myRottation)/180*Math.PI)*carSize, myY + offsetY - Math.sin((myRottation)/180*Math.PI)*carSize,5,"stroke");
    drawArc(myX + offsetX + Math.cos((myRottation)/180*Math.PI)*carSize, myY + offsetY + Math.sin((myRottation)/180*Math.PI)*carSize,5,"stroke");

    drawArc(myX + offsetX + Math.cos((myRottation*-1 - 90+20)/180*Math.PI)*carSize/2, myY + offsetY - Math.sin((myRottation*-1 - 90+20)/180*Math.PI)*carSize/2,5,"stroke");
    drawArc(myX + offsetX - Math.cos((myRottation*-1 - 90-20)/180*Math.PI)*carSize/2, myY + offsetY + Math.sin((myRottation*-1 - 90-20)/180*Math.PI)*carSize/2,5,"stroke");
    drawArc(myX + offsetX + Math.cos((myRottation*-1 - 90-25)/180*Math.PI)*carSize/2, myY + offsetY - Math.sin((myRottation*-1 - 90-25)/180*Math.PI)*carSize/2,5,"stroke");
    drawArc(myX + offsetX - Math.cos((myRottation*-1 - 90+25)/180*Math.PI)*carSize/2, myY + offsetY + Math.sin((myRottation*-1 - 90+25)/180*Math.PI)*carSize/2,5,"stroke");*/