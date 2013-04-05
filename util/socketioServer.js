var socketIdToRoom = {"length": 0},
util = require('./util');

function _updateLength(obj) {
	obj.length = 0;
	for (var prop in obj){
		if(obj.hasOwnProperty(prop) && prop !== "length")
			obj.length += 1;
	}
}

exports = module.exports = function(socket){

	socket.on("join", function(data){
		socket.join(data.room);

		socketIdToRoom[socket.id] = data.room;
		_updateLength(socketIdToRoom);

		console.log(util.colors.magenta+"SocketIO Server: info - "+util.colors.cyan+socket.id+util.colors.green+" joined "+data.room+util.colors.reset+". No of people here: "+util.colors.yellow+socketIdToRoom.length+util.colors.reset);
		socket.in(data.room).emit("joinedSuccessfully", true);
	});

	socket.on('updateYourself', function(data){
		console.log(util.colors.magenta+"SocketIO Server: info - "+util.colors.reset+"Broadcasting updateYourselfSon event to room: "+util.colors.yellow+socketIdToRoom[socket.id]+util.colors.reset);
		socket.broadcast.to(socketIdToRoom[socket.id]).emit("updateYourselfSon", data);
	});

	socket.on("disconnect", function(data){
		console.log(util.colors.magenta+"SocketIO Server: info - "+util.colors.cyan+socket.id+util.colors.red+" disconnected from "+socketIdToRoom[socket.id]+util.colors.reset+". No of people here: "+util.colors.yellow+(socketIdToRoom.length === 0 ? 0 : socketIdToRoom.length-1)+util.colors.reset);

		delete socketIdToRoom[socket.id];
		_updateLength(socketIdToRoom);
	});


};