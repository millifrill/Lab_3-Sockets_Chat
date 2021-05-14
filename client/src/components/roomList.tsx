import { Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { ChatContext, Room } from "../contexts/chatContext";
import CreateRoomModal from "./createRoomModal";
import LockIcon from "@material-ui/icons/Lock";
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
	const styled = useStyles();
	const { allRooms, handleJoinRoom, handleLogout } = chatContext;

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

	const logout = () => {
		handleLogout();
	};

	return (
		<div className={styled.container}>
			<div className={styled.chatrooms}>
				<div className={styled.chatroomHeader}>
					<p>Rooms</p>
					<CreateRoomModal />
				</div>
				<div className={styled.roomList}>
					<ol>
						{allRooms.map((room) => (
							<dt key={room.name} onClick={() => handleRoomChange(room)}>
								{room.name}
								{room.hasPassword ? (
									<LockIcon color="primary" fontSize="small" />
								) : null}
							</dt>
						))}
					</ol>
				</div>
			</div>
			<div className={styled.buttonContainer}>
				<Button variant="contained" color="secondary" onClick={logout}>
					LOGOUT
				</Button>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		maxWidth: "18rem",
		borderRight: "1px solid #DCD9F2",
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	currentRoomHeader: {
		marginTop: "0.5rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		marginLeft: "90%",
		position: "absolute",
	},
	chatrooms: {
		width: "100%",
		height: "100%",
	},
	chatroomHeader: {
		background: "#897AF2",
		color: "white",
		height: "3.5rem",
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
	roomList: {
		flex: 1,
		"& ol": {
			overflowY: "auto",
			padding: 0,
			margin: 0,
			"& dt": {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "1rem 1.5rem",
				margin: 0,
				borderBottom: "1px solid #E5E5E5",
			},
		},
	},
	buttonContainer: {
		padding: "1.5rem 1.5rem",
		"& button": {
			width: "100%",
			textTransform: "capitalize",
			fontWeight: 600,
		},
	},
	roomName: {
		marginLeft: "2px",
		fontWeight: "bold",
	},
}));
