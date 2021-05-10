const io = require("socket.io");
const rooms = [];

/**
 * @param {*} data
 * @param {io.socket} socket
 */
async function handleJoinRoom(io, data, socket) {
  const { room, currentRoom, password, user } = data;

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
  io.to(data.room).emit("new-user-in-room", `${user} has joined the chat`);
  // Broadcast rooms update to all clients
  io.emit("all-rooms", getRooms(io));
}

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

function getRooms(io) {
  const sockets = io.of("/").adapter.rooms;
  const rooms = [];
  for (socket of sockets) {
    if (socket[0] !== socket[1].values().next().value) {
      const name = socket[0];
      const hasPassword = checkIfRoomHasPassword(socket[0]);
      rooms.push({ name: name, hasPassword: hasPassword });
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
  handleJoinRoom,
  handleDisconnect,
  handleSendMessage,
  handleCreateRoom,
  getRooms,
};
