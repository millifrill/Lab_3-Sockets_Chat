import { Component, createContext } from 'react';
import io from 'socket.io-client';

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
	handleSetUsername: (room: string, user: string) => void;
	handleJoinRoom: (room: string) => void;
	handleCreateRoom: (room: Room, user: string, password?: string) => void;
	handleLogout: (user: string) => void;
	handleSendMessage: (room: string, user: string, message: string) => void;
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
	socket = io('http://localhost:5000', { transports: ['websocket'] });
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
		this.setState((prevState) => ({
			...prevState,
			messages: [...prevState.messages, message],
		}));
	};

	incomingRooms = (rooms: Room[]) => {
		this.setState((prevState) => ({
			...prevState,
			allRooms: rooms,
		}));
	};

	incomingCreateRoom = (room: Room) => {
		this.setState((prevState) => ({
			...prevState,
			currentRoom: room.name,
			messages: [],
		}));
	};

	incomingJoinSuccess = () => {
		// Current user has successfully joined a new room
	};

	incomingUserInRoom = () => {
		// Another user has joined the room
	};

	incomingWrongPassword = () => {
		// Incorrect password
	};

	incomingDisconnect = (reason: any) => {
		console.log(reason);
	};

	componentDidMount() {
		this.socket.on('connect', this.incomingConnectionEstablished);
		this.socket.on('disconnect', this.incomingDisconnect);
		this.socket.on('join-room', this.incomingJoinRoom);
		this.socket.on('send-message', this.incomingMessage);
		this.socket.on('all-rooms', this.incomingRooms);
		this.socket.on('new-user-in-room', this.incomingUserInRoom);
		this.socket.on('create-room', this.incomingCreateRoom);
		this.socket.on('disconnect', this.incomingDisconnect);
		this.socket.on('join-success', this.incomingJoinSuccess);
		this.socket.on('wrong-password', this.incomingWrongPassword);
	}

	handleSetUsername = (name: string) => {
		this.setState((prevState) => ({
			...prevState,
			userName: name,
		}));
	};

	handleJoinRoom = async (room: string, password?: string) => {
		const { currentRoom } = this.state;
		// Adds user to new room
		this.socket.emit('join-room', {
			room: room,
			currentRoom: currentRoom,
			password: password,
		});
	};

	handleCreateRoom = async (room: Room, password: string) => {
		const { currentRoom } = this.state;
		// Creates and adds user to new room
		this.socket.emit('create-room', {
			room: room,
			currentRoom: currentRoom,
			password: password,
		});
	};

	handleLogout = () => {
		const { userName } = this.state;
		this.socket.emit('logout', { user: userName });
	};

	handleSendMessage = (message: string) => {
		const { userName, currentRoom } = this.state;

		// Sends message
		this.socket.emit('send-message', {
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
