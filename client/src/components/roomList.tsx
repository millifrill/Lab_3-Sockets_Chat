import { makeStyles } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useContext } from "react";
import { ChatContext, Room } from "../contexts/chatContext";
import CreateRoomModal from "./createRoomModal";

interface Props {
  setPasswordModal: React.Dispatch<
    React.SetStateAction<{
      room: Room;
      isOpen: boolean;
    }>
  >;
}

export default function RoomList(props: Props) {
  const { setPasswordModal } = props;
  const chatContext = useContext(ChatContext);
  const { allRooms, handleJoinRoom } = chatContext;
  const styled = useStyles();

  const handleRoomChange = (room: Room) => {
    if (room.hasPassword) {
      console.log("password");
      setPasswordModal({
        room: room,
        isOpen: true,
      });
    } else {
      console.log("no password");
      handleJoinRoom(room);
    }
  };

  return (
    <div className={styled.container}>
      <div className={styled.chatrooms}>
        <div className={styled.chatroomHeader}>
          <p>Rooms</p>
          <AddCircle />
          {CreateRoomModal}
        </div>
        <ol className={styled.olList}>
          <div className={styled.roomContainers} />
          {allRooms.map((room) => (
            <dt onClick={() => handleRoomChange(room)}>{room.name}</dt>
          ))}
        </ol>
        <button className={styled.buttonLogout}>Logout</button>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: "border-box",
    display: "flex",
    height: "100%",
    width: "20%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  chatrooms: {
    border: "1px solid #F6F6F6",
    width: "100%",
    height: "100%",
  },
  chatroomHeader: {
    background: "#897AF2",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 1.5rem",
    backgroundColor: theme.palette.secondary.main,
    "& p": {
      margin: 0,
      fontWeight: 600,
      color: "#ffff",
    },
    "& svg": {
      color: "#ffff",
    },
  },
  olList: {
    flex: 1,
    "& ol": {
      overflowY: "auto",
      padding: 0,
      margin: 0,
      "& dt": {
        padding: "1rem 1.5rem",
        margin: 0,
        borderBottom: "1px solid #E5E5E5",
      },
    },
  },
  roomContainers: {},
  buttonLogout: {
    position: "absolute",
    bottom: "3%",
    left: "1rem",
    borderRadius: "10px",
    height: "38px",
    width: "147px",
    color: "white",
    background: "#897AF2",
    border: "none",
    fontWeight: "bold",
  },
  roomName: {
    marginLeft: "2px",
    fontWeight: "bold",
  },
}));
