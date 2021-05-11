import TextField from "@material-ui/core/TextField";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/chatContext";
import { Button, makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router";

export default function LoginPage() {
	const history = useHistory();
	const styled = useStyles();
	const logoImg = `../assets/logo.png`;
	const [passwordInput, showPasswordInput] = useState(false);
	const chatContext = useContext(ChatContext);
	const { allRooms, errors, currentRoom, handleCreateRoom, handleJoinRoom } =
		chatContext;

	const [userSettings, setUserSettings] = useState({
		userName: "",
		room: {
			name: "",
			password: "",
			isNewRoom: true,
		},
	});

	// If user has been assigned a room, redirect to chatroom
	useEffect(() => {
		if (currentRoom) {
			history.push("/chatroom");
		}
	}, [history, currentRoom]);

	const handleUserNameChange = (name: string) => {
		setUserSettings((prevState) => ({
			...prevState,
			userName: name,
		}));
	};

	const handleJoinRoomChange = (index: string) => {
		const room = allRooms[Number(index)];
		if (room.hasPassword) {
			showPasswordInput(true);
		}
		setUserSettings((prevState) => ({
			...prevState,
			room: {
				...prevState.room,
				name: room.name,
				isNewRoom: false,
			},
		}));
	};

	const handleCreateRoomChange = (name: string) => {
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

	const connect = () => {
		const { userName } = userSettings;
		const { password, isNewRoom, name } = userSettings.room;
		const room = { name: name };
		if (isNewRoom) {
				handleCreateRoom(room, password, userName);
		} else {
				handleJoinRoom(room, password, userName);
		}
	};

	return (
		<div className={styled.mainContent}>
			<p className={styled.nameStyle}>Chattastic</p>
			<img src={logoImg} alt="" className={styled.imgStyle} />
			<div className={styled.formBox}>
				<p className={styled.text}>Please choose a username</p>
				<TextField
					className={styled.textField}
					id="outlined-basic"
					placeholder="Enter username"
					onChange={(e) => handleUserNameChange(e.target.value)}
					variant="outlined"
				/>
				{errors.noUsername ? <p className={styled.errorMessage}>Please enter a username</p> : null}
				{allRooms.length ? (
					<>
						<p className={styled.text}>Choose a room to join</p>
						<TextField
							className={styled.textField}
							id="outlined-select"
							placeholder="Choose room"
							select
							defaultValue={""}
							variant="outlined"
							onChange={(e) => handleJoinRoomChange(e.target.value)}
						>
							{allRooms.map((room, index) => (
								<MenuItem key={index} value={index}>
									{room.name}
								</MenuItem>
							))}
						</TextField>
						{passwordInput ? (
							<TextField
								className={styled.textField}
								id="outlined-basic"
								placeholder="Enter room password"
								onChange={(e) =>
									handlePasswordChange(e.target.value)
								}
								variant="outlined"
							/>
						) : null}
						{errors.wrongPassword ? <p className={styled.errorMessage}>Incorrect password</p> : null}
						<div className={styled.divideContainer}>
						<hr className={styled.hr}/>
						<p className={styled.breakText}>Or</p>
						<hr className={styled.hr}/>
						</div>
					</>
				) : null}
				<p className={styled.text}>Create a new chatroom</p>
				<TextField
					className={styled.textField}
					id="outlined-basic"
					placeholder="Enter room name"
					variant="outlined"
					onChange={(e) => handleCreateRoomChange(e.target.value)}
				/>
				{errors.noRoomName ? <p className={styled.errorMessage}>Please enter a room name</p> : null}
				{errors.roomNameAlreadyInUse ? <p className={styled.errorMessage}>Room name is already in use</p> : null}
				<p className={styled.text}>Choose room password (optional)</p>
				<TextField
					className={styled.textField}
					id="outlined-basic"
					placeholder="Enter password"
					type="password"
					variant="outlined"
					onChange={(e) => handlePasswordChange(e.target.value)}
				/>
				<Button className={styled.connectButton} onClick={connect} variant="contained" color="secondary">
					Connect
				</Button>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	mainContent: {
		width: "100%",
		minHeight: "100vh",
		padding: "2.5rem 1.5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: theme.palette.primary.main,
		textAlign: "center",
	},
	imgStyle: {
		width: "4.5rem",
	},
	nameStyle: {
		fontSize: "3.5rem",
		margin: 0,
		color: theme.palette.secondary.main,
	},
	formBox: {
		display: "flex",
		width: "100%",
		maxWidth: "18rem",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	textField: {
		textAlign: "left",
		margin: "0.5rem 0 0 0",
		borderRadius: "0.4rem",
		width: "100%",
		backgroundColor: "#ffff",
		"& .MuiOutlinedInput-input": {
			padding: "0.7rem"
		},
	},
	connectButton: {
		marginTop: "1.5rem",
		width: "100%",
		fontWeight: 600,
	},
	text: {
		margin: "1.2rem 0 0.25rem 0",
		color: "#1CA491",
		textAlign: "center",
		width: "100%",
		fontWeight: 600,
	},
	divideContainer: {
		width: "100%",
		marginTop: "1.5rem",
	},
	breakText: {
		color: theme.palette.secondary.main,
		textAlign: "center",
		width: "100%",
		fontWeight: 600,
		margin: "0.5rem 0",
	},
	hr: {
		border: "none",
		borderTop: `1px ${theme.palette.secondary.main} solid`,
		width: "100%",
	},
	flexCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	errorMessage: {
		margin: "0.5rem 0 0 0",
		fontStyle: "italic",
		fontSize: "0.8rem",
		color: "red",
	},
}));
