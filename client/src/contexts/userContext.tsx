import { Component, createContext } from "react";
import { io } from "socket.io-client";
const socket = io();

interface Room {
  roomName: string;
}

interface State {
  userName: string;
  rooms: Room[];
}

interface Context extends State {
  handleSetUsername: (room: string, user: string) => void;
  handleJoinRoom: (room: string, user: string) => void;
  handleCreateRoom: (room: string, user: string) => void;
  handleLogout: (user: string) => void;
  handleSendMessage: (room: string, user: string, message: string) => void;
}

export const UserContext = createContext<Context>({
  userName: "",
  rooms: [],
  handleSetUsername: () => {},
  handleJoinRoom: () => {},
  handleCreateRoom: () => {},
  handleLogout: () => {},
  handleSendMessage: () => {},
});

class UserProvider extends Component<{}, State> {
  state: State = {
    userName: "",
    rooms: [{ roomName: "DefaultRoom" }],
  };

  componentDidMount() {
    socket.on("connect", () => {
      console.log("Client socket connected");
    });
  }

  handleSetUsername = (name: string) => {
    this.setState((prevState) => ({
      ...prevState,
      userName: name,
    }));
  };

  handleJoinRoom = (room: string, user: string) => {
    socket.emit("join-room", { room: room, user: user });
    this.setState((prevState) => ({
      ...prevState,
      rooms: [...prevState.rooms, { roomName: room }],
    }));
  };

  handleCreateRoom = (room: string, user: string) => {
    socket.emit("create-room", { room: room, user: user });
  };

  handleLogout = (user: string) => {
    socket.emit("logout", { user: user });
  };

  handleSendMessage = (room: string, user: string, message: string) => {
    socket.emit("send-message", { user: user, room: room, message: message });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          userName: this.state.userName,
          rooms: this.state.rooms,
          handleSetUsername: this.handleSetUsername,
          handleJoinRoom: this.handleJoinRoom,
          handleCreateRoom: this.handleCreateRoom,
          handleSendMessage: this.handleSendMessage,
          handleLogout: this.handleLogout,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
