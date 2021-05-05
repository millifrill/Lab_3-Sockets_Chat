const io = require('socket.io');

/**
 * @param {*} data
 * @param {io.socket} socket
 */

// lägg till vilket rum man går med i plus kontrollera lösenordet om rummet kräver lösenord
async function handleJoinRoom(io, data, socket) {
	await socket.join(room);
	// Respond to client that join was successful
	io.to(socket.id).emit('join success');
	// Broadcast message to all clients in the room
	io.to(data.room).emit(`${data.name} has joined the chat`);
	// Broadcast rooms update to all clients
	io.emit('all-rooms', getRooms());
}

function handleSendMessage(message) {
	io.to(data.room).emit('send-message', message);
}

function handleCreateRoom(room) {
	socket.join('create-room', room);
	io.emit('all-rooms', getRooms());
}

function handleDisconnect(reason, socket, io) {
	io.emit('all-rooms', getRooms());
}

function getRooms() {
	const sockets = Object.values(io.sockets.sockets);
	let rooms = [];
	for (const socket of sockets) {
		const actualRooms = Object.keys(socket.rooms).filter(
			(room) => room !== socket.id,
		);
		rooms.push(...actualRooms);
	}
	return [...new Set(rooms)];
}

module.exports = {
	handleJoinRoom,
	handleDisconnect,
	handleSendMessage,
	handleCreateRoom,
};
