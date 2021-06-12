import io from 'socket.io-client';
/* 
const socket = io('http://localhost:5000', {
	transports: ['websocket'],
}); */

const socket = io('https://chattastic-app.herokuapp.com/', {
    transports: ['websocket'],
});

export { socket };
