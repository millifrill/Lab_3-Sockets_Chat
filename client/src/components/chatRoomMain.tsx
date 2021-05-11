import { makeStyles } from "@material-ui/core";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatContext } from "../contexts/chatContext";
import ChatRoomBox from "./chatRoomBox";
import Header from "./header";
import MobileRoomList from "./mobileRoomList";
import PasswordModal from "./passwordModal";
import RoomList from "./roomList";

export default function ChatRoom() {
  const history = useHistory();
  const chatContext = useContext(ChatContext);
  const { userName } = chatContext;
  const styled = useStyles();
  const [mobileRoomList, setMobileRoomList] = useState(false);
  const [passwordModal, setPasswordModal] = useState({
    room: {
      name: "",
    },
    isOpen: false,
  });

  useEffect(() => {
    if (!userName) {
      history.push("/");
    }
  }, [userName, history]);

  return (
    <div className={styled.relative}>
      {mobileRoomList && <MobileRoomList setPasswordModal={setPasswordModal} />}
      {passwordModal && (
        <PasswordModal
          setPasswordModal={setPasswordModal}
          passwordModal={passwordModal}
        />
      )}
      <Header
        setMobileRoomList={setMobileRoomList}
        mobileRoomList={mobileRoomList}
      />
      <div className={styled.flex}>
        <RoomList setPasswordModal={setPasswordModal} />
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
