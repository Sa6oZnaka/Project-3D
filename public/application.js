socket.on('spawn', function (data) {
	let veh = new Movable(data.x, data.y,data.z,data.sizeX , data.sizeY, data.sizeY, data.angle, data.type, data.id, data.speed);

	vehs.set(data.id, veh);
});

socket.on('update', function (data) {
	let veh = new Movable(data.x, data.y,data.z,data.sizeX , data.sizeY, data.sizeY, data.angle, data.type, data.id, data.speed);

	vehs.set(data.id, veh);
});

socket.on('delete', function (data) {
	vehs.delete(data.id);
});
