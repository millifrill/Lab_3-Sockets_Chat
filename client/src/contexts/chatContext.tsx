import { Component, createContext } from "react";
import { socket } from "../socket";
interface Errors {
	wrongPassword: string;
	roomNameAlreadyInUse: string;
	noUsername: string;
	noRoomName: string;
}
export interface Message {
	userName: string;
	message: string;
}
export interface Room {
	name: string;
	hasPassword?: boolean;
	users?: string[];
}
interface State {
	userName: string;
	currentRoom: string;
	allRooms: Room[];
	messages: Message[];
	errors: Errors;
}
interface Context extends State {
	handleSetUsername: (user: string) => void;
	handleJoinRoom: (room: Room, password?: string) => void;
	handleCreateRoom: (room: Room, password?: string) => void;
	handleLogout: (user: string) => void;
	handleDisconnect: (user: string) => void;
	handleSendMessage: (message: string) => void;
}

export const ChatContext = createContext<Context>({
	userName: "",
	currentRoom: "",
	allRooms: [],
	messages: [],
	errors: {
		wrongPassword: "",
		roomNameAlreadyInUse: "",
		noUsername: "",
		noRoomName: "",
	},
	handleSetUsername: () => {},
	handleJoinRoom: () => {},
	handleCreateRoom: () => {},
	handleLogout: () => {},
	handleDisconnect: () => {},
	handleSendMessage: () => {},
});

class ChatProvider extends Component<{}, State> {
	/* socket = io('http://localhost:5000', { transports: ['websocket'] }); */
	state: State = {
		userName: "",
		currentRoom: "",
		allRooms: [],
		messages: [],
		errors: {
			wrongPassword: "",
			roomNameAlreadyInUse: "",
			noUsername: "",
			noRoomName: "",
		},
	};

	incomingJoinRoom = (room: Room) => {
		this.setState((prevState) => ({
			...prevState,
			currentRoom: room.name,
			messages: [],
		}));
	};

	incomingConnectionEstablished = () => {
		console.log("Connection established");
	};

	incomingMessage = (message: Message) => {
		console.log("incoming message:", message);
		this.setState((prevState) => ({
			...prevState,
			messages: [...prevState.messages, message],
		}));
	};

	incomingRooms = (rooms: Room[]) => {
		console.log("incoming rooms:", rooms);
		this.setState((prevState) => ({
			...prevState,
			allRooms: rooms,
		}));
	};

	incomingCreateRoom = (room: Room) => {
		console.log("new room has been created");
		this.setState((prevState) => ({
			...prevState,
			currentRoom: room.name,
			messages: [],
		}));
	};

	incomingJoinSuccess = () => {
		console.log("You have joined a new room");
		// Current user has successfully joined a new room
	};

	incomingUserInRoom = (message: string) => {
		console.log(message);
		// Another user has joined the room
	};

	incomingError = (error: string) => {
		this.setState((prevState) => ({
			...prevState,
			errors: { ...prevState.errors, [error]: error },
		}));
		console.log(this.state.errors);
	};

	incomingNoError = (noError: string) => {
		this.setState((prevState) => ({
			...prevState,
			errors: { ...prevState.errors, [noError]: "" },
		}));
		console.log(this.state.errors);
	};

	incomingDisconnect = (reason: any) => {
		console.log(reason);
	};

	componentDidMount() {
		socket.on("connect", this.incomingConnectionEstablished);
		socket.on("disconnect", this.incomingDisconnect);
		socket.on("join-room", this.incomingJoinRoom);
		socket.on("send-message", this.incomingMessage);
		socket.on("all-rooms", this.incomingRooms);
		socket.on("new-user-in-room", this.incomingUserInRoom);
		socket.on("create-room", this.incomingCreateRoom);
		socket.on("join-success", this.incomingJoinSuccess);
		socket.on("no-error", this.incomingNoError);
		socket.on("error", this.incomingError);
	}

	handleSetUsername = (name: string) => {
		console.log("Your username is:", name);
		this.setState((prevState) => ({
			...prevState,
			userName: name,
		}));
	};

	handleJoinRoom = async (room: Room, password?: string) => {
		const { currentRoom, userName } = this.state;
		// Adds user to new room
		socket.emit("join-room", {
			room: room,
			user: userName,
			currentRoom: currentRoom,
			password: password,
		});
	};

	handleCreateRoom = async (room: Room, password?: string) => {
		const { currentRoom } = this.state;
		// Creates and adds user to new room
		socket.emit("create-room", {
			room: room,
			currentRoom: currentRoom,
			password: password,
		});
	};

	handleLogout = () => {
		const { userName } = this.state;
		socket.emit("logout", { user: userName });
	};

	handleDisconnect = () => {
		const { userName } = this.state;
		socket.emit("disconnect", { user: userName });
	};

	handleSendMessage = (message: string) => {
		const { userName, currentRoom } = this.state;

		// Sends message
		socket.emit("send-message", {
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
					errors: this.state.errors,
					handleSetUsername: this.handleSetUsername,
					handleJoinRoom: this.handleJoinRoom,
					handleCreateRoom: this.handleCreateRoom,
					handleSendMessage: this.handleSendMessage,
					handleLogout: this.handleLogout,
					handleDisconnect: this.handleDisconnect,
				}}
			>
				{this.props.children}
			</ChatContext.Provider>
		);
	}
	//   userName: "",
	//   currentRoom: "",
	//   allRooms: [],
	//   messages: [],
	//   errors: {
	//     wrongPassword: "",
	//     roomNameAlreadyInUse: "",

	//   },
	//   handleJoinRoom: () => {},
	//   handleCreateRoom: () => {},
	//   handleLogout: () => {},
	//   handleSendMessage: () => {},
}

export default ChatProvider;
