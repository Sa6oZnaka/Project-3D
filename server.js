let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static("public"));

let id = 0;
let list = [];
let freeSpots = [];//for big number of users better to use a heap
let data = {};
data.users = [];


let vehs = new Map();

io.on('connection', function (socket) {

    console.log(`ID ${socket.id} connected!`);
    socket.emit('init', {
        'vehs': vehs,
    });

    socket.on('spawn', function (car) {
        let veh = {
            'x': -600 + Math.random() * 3000,
            'y': 120,
            'z': Math.random() * 1000,
            'sizeX': 200,
            'sizeY': 100,
            'sizeZ': 300,
            'angle': 30,
            'color' : Math.floor(Math.random() * 6),
            'type': "Porsche_911",
            'id': socket.id
        };

        vehs.set(veh.id, veh);
        io.emit('spawn', veh);
    });

    socket.on('update', function (data) {
        vehs.set(data.id, {
            'x': data.x,
            'y': data.y,
            'z': data.z,
            'sizeX' : data.sizeX,
            'sizeY' : data.sizeY,
            'sizeZ' : data.sizeZ,
            'angle': data.angle,
            'type' : data.type,
            'id' : socket.id
        });

        socket.broadcast.emit('update', data);
    });

    socket.on('disconnect', function () {
        vehs.delete(socket.id);

        io.emit('delete', {
            'id': socket.id
        });
        console.log(`ID ${socket.id} disconnected!`);
    });
});


http.listen(3000, function() {
    console.log("server started on port 3000");
});
