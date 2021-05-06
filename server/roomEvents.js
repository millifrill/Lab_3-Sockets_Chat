const io = require('socket.io');

/**
 * @param {*} data
 * @param {io.socket} socket
 */
function handleJoinRoom(data, socket) {
	socket.join(data.room);
	console.log('A user has joined the room', socket.rooms);
}

module.exports = {
	handleJoinRoom,
};
