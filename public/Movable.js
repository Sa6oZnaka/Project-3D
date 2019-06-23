class Movable extends Building{

    constructor(x, y, z, sizeX, sizeY, sizeZ, angle, type, id, speed, color){
        super(x, y, z, sizeX, sizeY, sizeZ, angle, type, id);

        this.color = color;
        this.speed = 0;
    }

    Move(direction){

        if(direction === "LEFT"){
            this.angle += (this.speed / 3.5) / 180 * PI;
            this.speed *= 0.99;
        }
        if(direction === "RIGHT"){
            this.angle -= (this.speed / 3.5) / 180 * PI;
            this.speed *= 0.99;
        }
        if(direction === "UP"){
            this.speed -= 0.06;
        }
        if(direction === "DOWN"){
            this.speed += 0.04;
        }
    }

    Update(){
        this.z += Math.cos(this.angle) * this.speed * 2;
        this.x -= Math.sin(this.angle) * this.speed * 2;

        this.speed *= 0.993;
    }

    getColor() {
        return this.color;
    }

}