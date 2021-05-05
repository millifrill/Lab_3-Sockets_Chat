const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client was connected", socket.id);

  // Send to all but socket
  socket.broadcast.emit("A user connected", socket.id);

  // Send to the user just connected
  socket.emit("User specific message", "Welcome to the chat room!");

  //setup event listners
  socket.on("join-room", (data) => handleJoinRoom(data, socket));
  socket.on("disconnect", (reason) => handleDisconnected(reason, socket, io));
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
