import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useHistory } from "react-router";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AddCircle } from "@material-ui/icons";
import { ChatContext } from "../contexts/chatContext";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { DialogContentText } from "@material-ui/core";

export default function CreateRoomModal() {
	const history = useHistory();
	const logoImg = `../assets/logo.png`;
	const styled = useStyles();
	const [open, setOpen] = React.useState(false);
	const chatContext = useContext(ChatContext);
	const { errors, currentRoom, handleCreateRoom } = chatContext;

	const [userSettings, setUserSettings] = useState({
		userName: "",
		room: {
			name: "",
			password: "",
			isNewRoom: true,
		},
	});

	const [userErrors, setUserErrors] = useState({
		userName: "",
		roomName: "",
	});

	useEffect(() => {
		if (currentRoom) {
			history.push("/chatroom");
		}
	}, [history, currentRoom]);

	const handleCreateRoomChange = (name: string) => {
		if (!name) {
			setUserErrors((prevState) => ({
				...prevState,
				roomName: "Please enter a room name",
			}));
		} else {
			setUserErrors((prevState) => ({
				...prevState,
				roomName: "",
			}));
		}
		setUserSettings((prevState) => ({
			...prevState,
			room: {
				...prevState.room,
				name: name,
				isNewRoom: true,
			},
		}));
	};

	const handlePasswordChange = (password: string) => {
		setUserSettings((prevState) => ({
			...prevState,
			room: {
				...prevState.room,
				password: password,
			},
		}));
	};

	function checkCreateRoomValidation() {
		if (!userErrors.roomName && userSettings.room.name) {
			return true;
		} else {
			setUserErrors((prevState) => ({
				...prevState,
				roomName: "Please enter a room name",
			}));
			return false;
		}
	}

	const connect = () => {
		const { password, name } = userSettings.room;
		const room = { name: name };
		if (checkCreateRoomValidation()) {
			handleCreateRoom(room, password);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={styled.modalBox}>
			<AddCircle color="primary" onClick={handleClickOpen} />
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title" className={styled.modalTitle}>
					Create a new chat room
				</DialogTitle>
				<img src={logoImg} alt="" className={styled.imgStyle} />
				<DialogContent>
					<DialogContentText className={styled.dialogContentText}>
						Enter name of chat room{" "}
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="chatroom"
						label="Enter room name"
						type="chatroom"
						variant="outlined"
						onChange={(e) => handleCreateRoomChange(e.target.value)}
						fullWidth
					/>
					<p className={styled.errorMessage}>
						{userErrors.roomName ? userErrors.roomName : null}
					</p>
					<p className={styled.errorMessage}>
						{errors.roomNameAlreadyInUse
							? "Room name already in use"
							: null}
					</p>
					<DialogContentText className={styled.dialogContentText}>
						Enter chat room password (optional)
					</DialogContentText>
					<TextField
						margin="dense"
						id="password"
						label="Enter password (Optional)"
						type="password"
						variant="outlined"
						onChange={(e) => handlePasswordChange(e.target.value)}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						className={styled.buttonStyle}
						variant="outlined"
						onClick={() => {
							handleClose();
							connect();
						}}
						color="primary"
					>
						Create room
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modalBox: {
			height: "1.5rem",
			maxWidth: "10rem",
		},
		imgStyle: {
			width: "5rem",
			alignSelf: "center",
		},
		modalTitle: {
			color: "black",
			fontSize: "1.2rem",
			fontWeight: 800,
		},
		buttonStyle: {
			height: "2rem",
			width: "9rem",
			borderRadius: 10,
			border: "none",
			background: "#7361EF",
			color: "white",
			fontSize: "0.8rem",
			fontWeight: 600,
		},
		dialogContentText: {
			color: "#7361EF",
			margin: 0,
		},
		errorMessage: {
			color: "red",
		},
	}),
);
