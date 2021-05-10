import { CSSProperties } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../contexts/chatContext';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';

export default function LoginPage() {
	const history = useHistory();
	const logoImg = `../assets/logo.png`;
	const [passwordInput, showPasswordInput] = useState(false);
	const chatContext = useContext(ChatContext);
	const {
		allRooms,
		errors,
		currentRoom,
		handleCreateRoom,
		handleJoinRoom,
		handleSetUsername,
	} = chatContext;

	const [userSettings, setUserSettings] = useState({
		userName: '',
		room: {
			name: '',
			password: '',
			isNewRoom: true,
		},
	});

	const [userErrors, setUserErrors] = useState({
		userName: '',
		roomName: '',
	});

	// If user has been assigned a room, redirect to chatroom
	useEffect(() => {
		if (currentRoom) {
			history.push('/chatroom');
		}
	}, [history, currentRoom]);

	const handleUserNameChange = (name: string) => {
		if (!name) {
			setUserErrors((prevState) => ({
				...prevState,
				userName: 'Please enter a username',
			}));
		} else {
			setUserErrors((prevState) => ({
				...prevState,
				userName: '',
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
				roomName: 'Please enter a room name',
			}));
		} else {
			setUserErrors((prevState) => ({
				...prevState,
				roomName: '',
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
				userName: 'Please enter a username',
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
				roomName: 'Please enter a room name',
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
				handleCreateRoom(room, password);
				handleSetUsername(userName);
			}
		} else {
			if (checkUserValidation()) {
				handleJoinRoom(room, password);
				handleSetUsername(userName);
			}
		}
	};

	return (
		<div style={mainContent}>
			<p style={nameStyle}>Chattastic</p>
			<img src={logoImg} alt='' style={imgStyle} />
			<div style={formBox}>
				<div>
					<p style={text}>Please enter your name</p>
					<TextField
						style={formStyle}
						id='outlined-basic'
						placeholder='Enter name'
						onChange={(e) => handleUserNameChange(e.target.value)}
						variant='outlined'
					/>
					<p style={errorMessage}>
						{userErrors.userName ? userErrors.userName : ''}
					</p>
					{allRooms.length ? (
						<div style={flexCenter}>
							<p style={text}>Choose a room to join</p>
							<TextField
								style={formStyle}
								id='outlined-select'
								placeholder='Choose room'
								select
								variant='outlined'
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
									style={formStyle}
									id='outlined-basic'
									placeholder='Enter password'
									onChange={(e) =>
										handlePasswordChange(e.target.value)
									}
									variant='outlined'
								/>
							) : null}
							<p style={errorMessage}>
								{errors.wrongPassword
									? 'Please enter the correct password'
									: ''}
							</p>
							<p style={text}>Or</p>
						</div>
					) : null}
					<p style={text}>Create a new chatroom</p>
					<div style={formBox}>
						<TextField
							style={formStyle}
							id='outlined-basic'
							placeholder='Enter room name'
							variant='outlined'
							onChange={(e) => handleCreateRoomChange(e.target.value)}
						/>
						<p style={errorMessage}>
							{userErrors.roomName ? userErrors.roomName : null}
						</p>
						<p style={errorMessage}>
							{errors.roomNameAlreadyInUse
								? 'Room name already in use'
								: null}
						</p>
						<p style={text}>Enter chatroom password</p>
						<TextField
							style={formStyle}
							id='outlined-basic'
							placeholder='Password'
							type='password'
							variant='outlined'
							onChange={(e) => handlePasswordChange(e.target.value)}
						/>
						<button style={connectButton} onClick={connect}>
							Connect
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const mainContent: CSSProperties = {
	width: '100%',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	backgroundColor: '#DCD9F2',
};
const imgStyle: CSSProperties = {
	width: '6rem',
	position: 'relative',
	marginTop: '-5rem',
};

const nameStyle: CSSProperties = {
	fontSize: '4rem',
	marginTop: '-2rem',
	color: '#7361EF',
	width: '100%',
	heigth: '100%',
	textAlign: 'center',
};

const formBox: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
};

const formStyle: CSSProperties = {
	width: '18rem',
	borderRadius: 9,
	outline: 'none',
	marginTop: '0.3rem',
	background: 'white',
};

const connectButton: CSSProperties = {
	marginTop: '0.5rem',
	height: '3rem',
	width: '18rem',
	borderRadius: 20,
	border: 'none',
	background: '#7361EF',
	color: 'white',
	fontSize: '1rem',
	fontWeight: 600,
};

const text: CSSProperties = {
	color: '#1CA491',
	textAlign: 'center',
	margin: '0.5rem',
	fontWeight: 600,
};

const flexCenter: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
};

const errorMessage: CSSProperties = {
	color: 'red',
};
