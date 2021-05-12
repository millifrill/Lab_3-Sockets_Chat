const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

const {
	handleCreateRoom,
	handleJoinRoom,
	handleSendMessage,
	handleLogout,
	handleRegisterUser,
	getRooms,
} = require("./roomEvents");

io.on('connection', (socket) => {
	console.log('Client was connected', socket.id);
	io.emit('all-rooms', getRooms(io));

	// Setup event listeners
	socket.on("join-room", (data) => handleJoinRoom(io, data, socket));
	socket.on("register-user", (data) => handleRegisterUser(data, socket))
	socket.on("create-room", (data) => handleCreateRoom(data, socket, io));
	socket.on("send-message", (data) => handleSendMessage(data, io));
	socket.on("logout", (data) => handleLogout(data, socket, io));
	socket.on("disconnect", (reason) => handleDisconnect(reason, io));
});

server.listen(5000, () => {
	console.log("Server is running on port 5000");
});
