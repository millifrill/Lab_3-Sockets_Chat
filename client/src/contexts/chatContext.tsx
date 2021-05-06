import { Component, createContext } from 'react';
import { socket } from '../socket';

interface Message {
	userName: string;
	message: string;
}

interface Room {
	name: string;
}

interface State {
	userName: string;
	currentRoom: string;
	allRooms: Room[];
	messages: Message[];
}

interface Context extends State {
	handleSetUsername: (user: string) => void;
	handleJoinRoom: (room: string) => void;
	handleCreateRoom: (room: Room, password?: string) => void;
	handleLogout: (user: string) => void;
	handleSendMessage: (message: string) => void;
}

export const ChatContext = createContext<Context>({
	userName: '',
	currentRoom: '',
	allRooms: [],
	messages: [],
	handleSetUsername: () => {},
	handleJoinRoom: () => {},
	handleCreateRoom: () => {},
	handleLogout: () => {},
	handleSendMessage: () => {},
});

class ChatProvider extends Component<{}, State> {
	/* socket = io('http://localhost:5000', { transports: ['websocket'] }); */
	state: State = {
		userName: '',
		currentRoom: '',
		allRooms: [],
		messages: [],
	};

	incomingJoinRoom = (room: Room) => {
		this.setState((prevState) => ({
			...prevState,
			currentRoom: room.name,
			messages: [],
		}));
	};

	incomingConnectionEstablished = () => {
		console.log('Connection established');
	};

	incomingMessage = (message: Message) => {
		console.log('incoming message:', message);
		this.setState((prevState) => ({
			...prevState,
			messages: [...prevState.messages, message],
		}));
	};

	incomingRooms = (rooms: Room[]) => {
		console.log('incoming rooms:', rooms);
		this.setState((prevState) => ({
			...prevState,
			allRooms: rooms,
		}));
	};

	incomingCreateRoom = (room: Room) => {
		console.log('new room has been created');
		this.setState((prevState) => ({
			...prevState,
			currentRoom: room.name,
			messages: [],
		}));
	};

	incomingJoinSuccess = () => {
		console.log('You have joined a new room');
		// Current user has successfully joined a new room
	};

	incomingUserInRoom = (message: string) => {
		console.log(message);
		// Another user has joined the room
	};

	incomingWrongPassword = () => {
		// Incorrect password
	};

	incomingDisconnect = (reason: any) => {
		console.log(reason);
	};

	componentDidMount() {
		socket.on('connect', this.incomingConnectionEstablished);
		socket.on('disconnect', this.incomingDisconnect);
		socket.on('join-room', this.incomingJoinRoom);
		socket.on('send-message', this.incomingMessage);
		socket.on('all-rooms', this.incomingRooms);
		socket.on('new-user-in-room', this.incomingUserInRoom);
		socket.on('create-room', this.incomingCreateRoom);
		socket.on('disconnect', this.incomingDisconnect);
		socket.on('join-success', this.incomingJoinSuccess);
		socket.on('wrong-password', this.incomingWrongPassword);
	}

	handleSetUsername = (name: string) => {
		console.log('Your username is:', name);
		this.setState((prevState) => ({
			...prevState,
			userName: name,
		}));
	};

	handleJoinRoom = async (room: string, password?: string) => {
		const { currentRoom } = this.state;
		// Adds user to new room
		socket.emit('join-room', {
			room: room,
			currentRoom: currentRoom,
			password: password,
		});
	};

	handleCreateRoom = async (room: Room, password?: string) => {
		const { currentRoom } = this.state;
		// Creates and adds user to new room
		socket.emit('create-room', {
			room: room,
			currentRoom: currentRoom,
			password: password,
		});
	};

	handleLogout = () => {
		const { userName } = this.state;
		socket.emit('logout', { user: userName });
	};

	handleSendMessage = (message: string) => {
		const { userName, currentRoom } = this.state;

		// Sends message
		socket.emit('send-message', {
			userName: userName,
			message: message,
			room: currentRoom,
		});
	};

	render() {
		return (
			<ChatContext.Provider
				value={{
					userName: this.state.userName,
					currentRoom: this.state.currentRoom,
					allRooms: this.state.allRooms,
					messages: this.state.messages,
					handleSetUsername: this.handleSetUsername,
					handleJoinRoom: this.handleJoinRoom,
					handleCreateRoom: this.handleCreateRoom,
					handleSendMessage: this.handleSendMessage,
					handleLogout: this.handleLogout,
				}}
			>
				{this.props.children}
			</ChatContext.Provider>
		);
	}
}

export default ChatProvider;
