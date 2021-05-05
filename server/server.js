const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server);

const { handleJoinRoom, handleDisconnect } = require('./roomEvents');

io.on('connection', (socket) => {
	console.log('Client was connected', socket.id);

	// Send to all but socket
	socket.broadcast.emit('a-user-connected', socket.id);

	// Send to the user just connected
	socket.emit('user-specific-message', 'Welcome to the chat room!');

	//setup event listners
	socket.on('join-room', (data) => handleJoinRoom(data, socket));
	socket.on('disconnect', (reason) => handleDisconnect(reason, socket, io));
});

server.listen(5000, () => {
	console.log('Server is running on port 5000');
});
