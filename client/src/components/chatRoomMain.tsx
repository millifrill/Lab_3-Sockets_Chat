import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import ChatRoomBox from "./chatRoomBox";
import Header from "./header";
import MobileRoomList from "./mobileRoomList";
import RoomList from "./roomList";
import { ChatContext } from "../contexts/chatContext";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";

export default function ChatRoom() {
  const history = useHistory();
  const chatContext = useContext(ChatContext);
  const { currentRoom } = chatContext;
  const styled = useStyles();
  const [mobileRoomList, setMobileRoomList] = useState(false);

  useEffect(() => {
    if (!currentRoom) {
      history.push("/");
    }
  }, [currentRoom, history]);

  return (
    <div className={styled.relative}>
      {mobileRoomList && <MobileRoomList />}
      <Header
        setMobileRoomList={setMobileRoomList}
        mobileRoomList={mobileRoomList}
      />
      <div className={styled.flex}>
        <RoomList />
        <ChatRoomBox />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  relative: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  flex: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
  },
}));
