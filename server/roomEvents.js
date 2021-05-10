const io = require("socket.io");
const rooms = [];

/**
 * @param {*} data
 * @param {io.socket} socket
 */
async function handleJoinRoom(io, data, socket) {
  const { room, currentRoom, password } = data;

  // If user is currently in a room, leave room
  if (currentRoom) {
    await socket.leave(currentRoom);
  }

  const newRoomToJoin = rooms.find((r) => r.name === room.name);

  if (newRoomToJoin.password) {
    if (newRoomToJoin.password !== password) {
      // Set password error
      return await socket.emit("error", "wrongPassword");
    }
  }
  // Room has no password, or correct password was submitted
  await socket.join(room.name);
  // Remove password error
  await socket.emit("no-error", "wrongPassword");
  // Returns the room that has been joined to client
  io.to(socket.id).emit("join-room", room);
  // Respond to client that join was successful
  io.to(socket.id).emit("join-success");
  // Broadcast message to all clients in the room
  io.to(room.name).emit("new-user-in-room", `${socket.userName} has joined the chat`);
  // Broadcast rooms update to all clients
  io.emit("all-rooms", getRooms(io));
}

/**
 * @param {*} data
 * @param {io.socket} socket
 */
function handleRegisterUser(data, socket) {
  const {userName} = data;
  socket.userName = userName;
  socket.emit("register-user", userName)
}

/**
 * @param {*} data
 * @param {io.Namespace} io
 */
function handleSendMessage(data, io) {
  const { room, message, userName } = data;
  const returnMessage = { message: message, userName: userName };
  // Returns message to client
  io.to(room).emit("send-message", returnMessage);
}

async function handleCreateRoom(data, socket, io) {
  const { room, password, currentRoom } = data;

  const existingRoom = getRooms(io).find((r) => r.name === room.name);
  if (existingRoom) {
    // Set roomName error
    return await socket.emit("error", "roomNameAlreadyInUse");
  }

  // If user is currently in a room, leave room
  if (currentRoom) {
    await socket.leave(currentRoom);
  }

  const newRoom = {
    name: room.name,
    password: password,
  };

  await socket.join(room.name);
  // Remove roomName error
  await socket.emit("no-error", "roomNameAlreadyInUse");
  // Returns the room that has been joined to client
  io.to(socket.id).emit("join-room", room);
  // Respond to client that join was successful
  io.to(socket.id).emit("join-success");
  // Adds new room to room array
  rooms.push(newRoom);
  io.emit("all-rooms", getRooms(io));
}

function handleDisconnect(reason, io) {
  console.log(reason);
  io.emit("all-rooms", getRooms(io));
}

/**
 * @param {io.Namespace} io
 */
function getRooms(io) {
  const sockets = io.of("/").adapter.rooms;
  const rooms = [];
  for (socket of sockets) {
    if (socket[0] !== socket[1].values().next().value) {
      const roomName = socket[0];
      const hasPassword = checkIfRoomHasPassword(socket[0]);
      const users = getUsers(roomName, io)
      rooms.push({ name: roomName, hasPassword: hasPassword, users: users });
    }
  }
  // let rooms = [];
  /* const sockets = Object.values(io.sockets.sockets);
  const rooms = [];
  for (const socket of sockets) {
    const actualRooms = Object.keys(socket.rooms).filter(
      (room) => room !== socket.id
    );
    rooms.push(...actualRooms);
  } */
  return rooms;
}

/**
 * 
 * @param {string} roomName 
 * @param {io.Namespace} io 
 * @returns 
 */
function getUsers(roomName, io) {
  const users = []
  const sockets = io.sockets.adapter.rooms.get(roomName);
  for (const socket of sockets ) {
     //this is the socket of each client in the room.
     const user = io.sockets.sockets.get(socket).userName;
     users.push(user)
  }
  return users;
}

/**
 * 
 * @param {*} socket
 */
function checkIfRoomHasPassword(socket) {
  for (room of rooms) {
    if (room.name === socket) {
      if (room.password) {
        return true;
      } else {
        return false;
      }
    }
  }
}

module.exports = {
  handleRegisterUser,
  handleJoinRoom,
  handleDisconnect,
  handleSendMessage,
  handleCreateRoom,
  getRooms,
};
