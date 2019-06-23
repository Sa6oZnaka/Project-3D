class Building{

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

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getZ(){
        return this.z;
    }

    getAngle(){
        return this.angle;
    }

}