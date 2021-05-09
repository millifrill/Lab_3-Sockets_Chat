import { makeStyles } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";



export default function RoomList() {
  const chatContext = useContext(ChatContext);
  const { allRooms } = chatContext;
  const styled = useStyles();

  return (
    <div className={styled.container}>
      <div className={styled.chatrooms}>
        <div className={styled.chatroomHeader}>
          <p>Rooms</p>
          <AddCircle />
        </div>
        <ol className={styled.olList}>
          <div className={styled.roomContainers} />
          {allRooms.map((room) => (
            <dt>{room.name}</dt>
          ))}
        </ol>
        <button className={styled.buttonLogout}>Logout</button>
      </div >
    </div >
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    boxSizing: "border-box",
  },
  chatrooms: {
    border: "1px solid #F6F6F6",
    width: "27.7%",
    height: "100%",
  },

  chatroomHeader: {
    background: '#897AF2',
    color: 'white',
    display: 'block',

    "& svg": {
      color: "#ffff",
      display: 'inline-block'
    },
  },

  olList: {
    padding: "0",
    margin: "0",
  },
  roomContainers: {
  },

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
