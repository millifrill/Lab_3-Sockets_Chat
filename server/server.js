const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const port = process.env.PORT || 4000;

const router = require('./router');

const app = express();

const server = http.createServer(app);
const io = new Server(server);

const {
  handleCreateRoom,
  handleJoinRoom,
  handleSendMessage,
  handleDisconnect,
  handleLogout,
  handleRegisterUser,
  getRooms,
  handleTyping,
} = require('./roomEvents');

io.on('connection', (socket) => {
  console.log('Client was connected', socket.id);
  io.emit('all-rooms', getRooms(io));

  // Setup event listeners
  socket.on('join-room', (data) => handleJoinRoom(io, data, socket));
  socket.on('register-user', (data) => handleRegisterUser(data, socket));
  socket.on('create-room', (data) => handleCreateRoom(data, socket, io));
  socket.on('send-message', (data) => handleSendMessage(data, io, socket));
  socket.on('typing', (data) => handleTyping(data, socket));
  socket.on('logout', (data) => handleLogout(data, socket, io));
  socket.on('disconnect', (reason) => handleDisconnect(reason, io, socket));
});

app.use(router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
