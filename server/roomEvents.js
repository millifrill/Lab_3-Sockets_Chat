const io = require('socket.io');
const rooms = [];

/**
 * @param {*} data
 * @param {io.Socket} socket
 */
async function handleJoinRoom(io, data, socket) {
    const { room, currentRoom, password } = data;

    const newRoomToJoin = rooms.find((r) => r.name === room.name);
    if (!room.name) {
        return socket.emit('error', 'noRoomName');
    }
    socket.emit('no-error', 'noRoomName');
    if (newRoomToJoin.password) {
        if (!password) {
            return socket.emit('error', 'noPassword');
        }
        socket.emit('no-error', 'noPassword');
        if (newRoomToJoin.password !== password) {
            // Set password error
            return socket.emit('error', 'wrongPassword');
        }
        socket.emit('no-error', 'wrongPassword');
    }

    // If user is currently in a room, leave room
    if (currentRoom) {
        await socket.leave(currentRoom);
    }

    // Room has no password, or correct password was submitted
    await socket.join(room.name);
    // Remove errors
    socket.emit('no-error', 'wrongPassword');
    socket.emit('no-error', 'noPassword');
    socket.emit('no-error', 'noMessage');
    // Returns the room that has been joined to client
    io.to(socket.id).emit('join-room', room);
    // Respond to client that join was successful
    io.to(socket.id).emit('join-success');
    // Broadcast message to all clients in the room
    io.to(room.name).emit(
        'new-user-in-room',
        `${socket.userName} has joined the chat`
    );
    // Broadcast rooms update to all clients
    io.emit('all-rooms', getRooms(io));
}

/**
 * @param {*} data
 * @param {io} io
 */
async function handleTyping(data, socket) {
    const { currentRoom, userName, message } = data;
    if (message) {
        socket.to(currentRoom).emit('typing', userName);
    } else {
        socket.to(currentRoom).emit('not-typing', userName);
    }
}

/**
 * @param {*} data
 * @param {io.Socket} socket
 */
async function handleRegisterUser(data, socket) {
    const userName = data;
    if (!userName) {
        return socket.emit('error', 'noUsername');
    }
    socket.emit('no-error', 'noUsername');
    socket.userName = userName;
    socket.emit('register-user', userName);
}

/**
 * @param {*} data
 * @param {io.Namespace} io
 */
function handleSendMessage(data, io, socket) {
    const { room, message, userName } = data;
    if (!message) {
        return socket.emit('error', 'noMessage');
    }
    const returnMessage = { message: message, userName: userName };
    socket.emit('no-error', 'noMessage');
    // Returns message to client
    io.to(room).emit('send-message', returnMessage);
}

async function handleCreateRoom(data, socket, io) {
    const { room, password, currentRoom } = data;

    const existingRoom = getRooms(io).find((r) => r.name === room.name);
    if (!room.name) {
        return (
            await socket.emit('error', 'noRoomName'),
            await socket.emit('no-error', 'roomNameAlreadyInUse')
        );
    }
    if (existingRoom) {
        return (
            await socket.emit('error', 'roomNameAlreadyInUse'),
            await socket.emit('no-error', 'noRoomName')
        );
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
    // Remove errors
    await socket.emit('no-error', 'roomNameAlreadyInUse');
    await socket.emit('no-error', 'noRoomName');
    // Returns the room that has been joined to client
    io.to(socket.id).emit('join-room', room);
    // Respond to client that join was successful
    io.to(socket.id).emit('join-success');
    // Adds new room to room array
    rooms.push(newRoom);
    io.emit('all-rooms', getRooms(io));
}

/**
 * @param {io.Socket} socket
 */
async function handleLogout(data, socket, io) {
    const { currentRoom } = data;
    // Remove user from current room
    await socket.leave(currentRoom);
    io.emit('all-rooms', getRooms(io));
}

function handleDisconnect(reason, io, socket) {
    console.log(reason);
    io.emit('all-rooms', getRooms(io));
}

/**
 * @param {io.Namespace} io
 */
function getRooms(io) {
    const sockets = io.of('/').adapter.rooms;
    const rooms = [];
    for (socket of sockets) {
        if (socket[0] !== socket[1].values().next().value) {
            const roomName = socket[0];
            const hasPassword = checkIfPassword(socket[0]);
            const users = getUsers(roomName, io);
            rooms.push({
                name: roomName,
                hasPassword: hasPassword,
                users: users,
            });
        }
    }
    return rooms;
}

/**
 *
 * @param {string} roomName
 * @param {io.Namespace} io
 * @returns
 */
function getUsers(roomName, io) {
    const users = [];
    const sockets = io.sockets.adapter.rooms.get(roomName);
    for (const socket of sockets) {
        const user = io.sockets.sockets.get(socket).userName;
        users.push(user);
    }
    return users;
}

/**
 *
 * @param {*} socket
 */
function checkIfPassword(socket) {
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
    handleLogout,
    getRooms,
    handleTyping,
};
