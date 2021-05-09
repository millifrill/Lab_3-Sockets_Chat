import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import ChatRoomBox from "./chatRoomBox";
import Header from "./header";
import MobileRoomList from "./mobileRoomList";
import RoomList from "./roomList";


function ChatRoom() {
	const styled = useStyles();
	const [mobileRoomList, setMobileRoomList] = useState(false);



	return (
		<div className={styled.relative}>
			{mobileRoomList && <MobileRoomList />}
			<Header
				setMobileRoomList={setMobileRoomList}
				mobileRoomList={mobileRoomList}
			/>
			< RoomList />
			<ChatRoomBox />

		</div>
	);
}

const useStyles = makeStyles((theme) => ({

	relative: {
		position: "relative",
		boxSizing: "border-box",

	},


}));

export default ChatRoom;
