import { Component, createContext } from "react";
import { io } from "socket.io-client";
const socket = io();

interface Room {
  name: string;
  password?: string;
  users: String[];
}

interface State {
  userName: string;
  currentRoom: string;
  allRooms: Room[];
}

interface Context extends State {
  handleJoinRoom: (room: string, user?: string) => void;
  handleCreateRoom: (room: Room, user: string, password?: string) => void;
  handleLogout: (user: string) => void;
  handleSendMessage: (room: string, user: string, message: string) => void;
}

export const ChatContext = createContext<Context>({
  userName: "",
  currentRoom: "",
  allRooms: [],
  handleJoinRoom: () => {},
  handleCreateRoom: () => {},
  handleLogout: () => {},
  handleSendMessage: () => {},
});

class ChatProvider extends Component<{}, State> {
  state: State = {
    userName: "",
    currentRoom: "",
    allRooms: [],
  };

  /* componentDidMount() {

  }

  this.socket.on("join-room", (room: Room) => {
    this.setState((prevState) => ({
        ...prevState,
        currentRoom: room.name,
      }));
  })

  this.socket.on("all-rooms", (rooms: Room[]) => {
    this.setState((prevState) => ({
        ...prevState,
        allRooms: rooms,
      }));
  })

  socket.on("send-message", () => {

  })

  socket.on("create-room", (room: Room) => {
    this.setState((prevState) => ({
      ...prevState,
      currentRoom: room.name,
    }));
  })

  socket.on("disconnect", () => {

  }) */

  handleSaveUser = (user: string) => {
    this.setState((prevState) => ({
      ...prevState,
      userName: user,
    }));
  };

  handleJoinRoom = async (room: string, password?: string) => {
    const { userName } = this.state;
    // Adds user to new room
    socket.emit("join-room", {
      room: room,
      user: userName,
      password: password,
    });
  };

  handleCreateRoom = async (room: Room) => {
    const { userName } = this.state;
    // Creates and adds user to new room
    socket.emit("create-room", { room: room, user: userName });
  };

  handleLogout = () => {
    const { userName } = this.state;

    socket.emit("logout", { user: userName });
    // Resets user states
    this.setState((prevState) => ({
      ...prevState,
      userName: "",
      currentRoom: "",
    }));
  };

  handleSendMessage = (message: string) => {
    const { allRooms, userName, currentRoom } = this.state;
    // Sends message
    socket.emit("send-message", {
      user: userName,
      message: message,
    });
  };

  render() {
    return (
      <ChatContext.Provider
        value={{
          userName: this.state.userName,
          currentRoom: this.state.currentRoom,
          allRooms: this.state.allRooms,
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
