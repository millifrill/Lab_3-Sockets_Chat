import { CSSProperties } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/chatContext";
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

	const [userErrors, setUserErrors] = useState({
		userName: "",
		roomName: "",
	});

	// If user has been assigned a room, redirect to chatroom
	useEffect(() => {
		if (currentRoom) {
			history.push("/chatroom");
		}
	}, [history, currentRoom]);

	const handleUserNameChange = (name: string) => {
		if (!name) {
			setUserErrors((prevState) => ({
				...prevState,
				userName: "Please enter a username",
			}));
		} else {
			setUserErrors((prevState) => ({
				...prevState,
				userName: "",
			}));
		}
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

	function checkUserValidation() {
		if (!userErrors.userName && userSettings.userName) {
			return true;
		} else {
			setUserErrors((prevState) => ({
				...prevState,
				userName: "Please enter a username",
			}));
			return false;
		}
	}

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
		const { userName } = userSettings;
		const { password, isNewRoom, name } = userSettings.room;
		const room = { name: name };
		if (isNewRoom) {
			if (checkUserValidation() && checkCreateRoomValidation()) {
				handleCreateRoom(room, password, userName);
			}
		} else {
			if (checkUserValidation()) {
				handleJoinRoom(room, password, userName);
			}
		}
	};

	return (
		<div className={styled.mainContent}>
			<p className={styled.nameStyle}>Chattastic</p>
			<img src={logoImg} alt="" className={styled.imgStyle} />
			<div className={styled.formBox}>
				<div>
					<p className={styled.text}>Please enter your name</p>
					<TextField
						className={styled.formStyle}
						id="outlined-basic"
						placeholder="Enter name"
						onChange={(e) => handleUserNameChange(e.target.value)}
						variant="outlined"
					/>
					<p className={styled.errorMessage}>
						{userErrors.userName ? userErrors.userName : ""}
					</p>
					{allRooms.length ? (
						<div className={styled.flexCenter}>
							<p className={styled.text}>Choose a room to join</p>
							<TextField
								className={styled.formStyle}
								id="outlined-select"
								placeholder="Choose room"
								select
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
									className={styled.formStyle}
									id="outlined-basic"
									placeholder="Enter password"
									onChange={(e) =>
										handlePasswordChange(e.target.value)
									}
									variant="outlined"
								/>
							) : null}
							<p className={styled.errorMessage}>
								{errors.wrongPassword
									? "Please enter the correct password"
									: ""}
							</p>
							<p className={styled.text}>Or</p>
						</div>
					) : null}
					<p className={styled.text}>Create a new chatroom</p>
					<div className={styled.formBox}>
						<TextField
							className={styled.formStyle}
							id="outlined-basic"
							placeholder="Enter room name"
							variant="outlined"
							onChange={(e) => handleCreateRoomChange(e.target.value)}
						/>
						<p className={styled.errorMessage}>
							{userErrors.roomName ? userErrors.roomName : null}
						</p>
						<p className={styled.errorMessage}>
							{errors.roomNameAlreadyInUse
								? "Room name already in use"
								: null}
						</p>
						<p className={styled.text}>Enter chatroom password</p>
						<TextField
							className={styled.formStyle}
							id="outlined-basic"
							placeholder="Password"
							type="password"
							variant="outlined"
							onChange={(e) => handlePasswordChange(e.target.value)}
						/>
						<button className={styled.connectButton} onClick={connect}>
							Connect
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	mainContent: {
		width: "100%",
		minHeight: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: "#DCD9F2",
	},
	imgStyle: {
		width: "6rem",
		position: "relative",
		marginTop: "-5rem",
	},
	nameStyle: {
		fontSize: "4rem",
		marginTop: "-2rem",
		color: "#7361EF",
		width: "100%",
		heigth: "100%",
		textAlign: "center",
	},
	formBox: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	formStyle: {
		width: "18rem",
		borderRadius: 9,
		outline: "none",
		marginTop: "0.3rem",
		background: "white",
	},
	connectButton: {
		marginTop: "0.5rem",
		height: "3rem",
		width: "18rem",
		borderRadius: 20,
		border: "none",
		background: "#7361EF",
		color: "white",
		fontSize: "1rem",
		fontWeight: 600,
	},
	text: {
		color: "#1CA491",
		textAlign: "center",
		margin: "0.5rem",
		fontWeight: 600,
	},
	flexCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	errorMessage: {
		color: "red",
	},
}));
