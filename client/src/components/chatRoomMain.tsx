import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import ChatRoomBox from "./chatRoomBox";
import Header from "./header";
import MobileRoomList from "./mobileRoomList";
import PasswordModal from "./passwordModal";
import RoomList from "./roomList";

export default function ChatRoom() {
  const styled = useStyles();
  const [mobileRoomList, setMobileRoomList] = useState(false);
  const [passwordModal, setPasswordModal] = useState({
    room: {
      name: "",
    },
    isOpen: false,
  });

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
