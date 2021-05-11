import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../contexts/chatContext';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

export default function LoginPage() {
	const history = useHistory();
	const styled = useStyles();
	const logoImg = `../assets/logo.png`;
	const [passwordInput, showPasswordInput] = useState(false);
	const chatContext = useContext(ChatContext);
	const {
		allRooms,
		errors,
		currentRoom,
		handleCreateRoom,
		handleJoinRoom,
	} = chatContext;

	const [userSettings, setUserSettings] = useState({
		userName: '',
		room: {
			name: '',
			password: '',
			isNewRoom: true,
		},
	});

	// If user has been assigned a room, redirect to chatroom
	useEffect(() => {
		if (currentRoom) {
			history.push('/chatroom');
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
			<img src={logoImg} alt='' className={styled.imgStyle} />
			<div className={styled.formBox}>
				<p className={styled.text}>Please enter your name</p>
				<TextField
					className={styled.textField}
					id='outlined-basic'
					placeholder='Enter name'
					onChange={(e) => handleUserNameChange(e.target.value)}
					variant='outlined'
				/>
				{errors.noUsername ? <p className={styled.errorMessage}>Please enter a username</p> : null}
				{allRooms.length ? (
					<>
						<p className={styled.text}>Choose a room to join</p>
						<TextField
							className={styled.textField}
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
								className={styled.textField}
								id='outlined-basic'
								placeholder='Enter password'
								onChange={(e) =>
									handlePasswordChange(e.target.value)
								}
								variant='outlined'
							/>
						) : null}
						{errors.wrongPassword
								? <p className={styled.errorMessage}>Please enter the correct password</p>
								: null}
						<p className={styled.text}>Or</p>
				</>
				) : null}
				<p className={styled.text}>Create a new chatroom</p>
				<TextField
					className={styled.textField}
					id='outlined-basic'
					placeholder='Enter room name'
					variant='outlined'
					onChange={(e) => handleCreateRoomChange(e.target.value)}
				/>
				{errors.noRoomName? <p className={styled.errorMessage}>Please enter a room name</p> : null}
				{errors.roomNameAlreadyInUse? <p className={styled.errorMessage}>Room name is already in use</p> : null}
				<p className={styled.text}>Enter chatroom password (optional)</p>
				<TextField
					className={styled.textField}
					id='outlined-basic'
					placeholder='Password'
					type='password'
					variant='outlined'
					onChange={(e) => handlePasswordChange(e.target.value)}
				/>
				<Button variant="contained" color="secondary" className={styled.connectButton} onClick={connect}>
					Connect
				</Button>
			</div>
		</div>
	);
}

const useStyles = makeStyles(theme => ({
	mainContent: {
		width: '100%',
		minHeight: '100vh',
		padding: "2rem 1.5rem",
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: "#E8E4FF",
		
	}, imgStyle: {
		width: '4.5rem',
		marginBottom: "1rem",

	}, nameStyle: {
		margin: 0,
		fontSize: '3.5rem',
		color: '#897AF2',
		textAlign: 'center',

	}, formBox: {
		width: "100%",
		maxWidth: "18rem",
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',

	}, textField: {
		width: "100%",
		borderRadius: 9,
		marginTop: "0.5rem",
		outline: 'none',
		background: 'white',
		"& .MuiOutlinedInput-input": {
			padding: "0.8rem",
		},

	}, connectButton: {
		width: "100%",
		marginTop: "1rem",
		fontWeight: 600,

	}, text: {
		width: "100%",
		margin: 0,
		marginTop: "1.2rem",
		color: '#1CA491',
		textAlign: 'center',
		fontWeight: 600,

	}, flexCenter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',

	}, errorMessage: {
		fontStyle: "italic",
		width: "100%",
		margin: "0.5rem 0 0 0",
		color: 'red',
		fontSize: "0.8rem",
		textAlign: "center",
	},
}));

