import { makeStyles } from "@material-ui/core";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatContext } from "../contexts/chatContext";
import ChatRoomBox from "../components/chatRoomBox";
import Header from "../components/header";
import MobileRoomList from "../components/mobileRoomList";
import PasswordModal from "../components/passwordModal";
import RoomList from "../components/roomList";
import { colorTheme } from "../styling/colorTheme";

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

	// Closes mobile room list if window width is higher than medium breakpoint
	useEffect(() => {
		function checkWindowWidth() {
			window.innerWidth > colorTheme.breakpoints.values.md
				? setMobileRoomList(false)
				: setMobileRoomList(mobileRoomList);
		}
		window.addEventListener("resize", checkWindowWidth);

		return function cleanup() {
			window.removeEventListener("resize", checkWindowWidth);
		};
	});

	return (
		<div className={styled.relative}>
			{mobileRoomList && (
				<MobileRoomList setPasswordModal={setPasswordModal} />
			)}
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
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	flex: {
		height: "calc(100% - 5rem)",
		display: "flex",
		flexDirection: "row",
	},
}));
