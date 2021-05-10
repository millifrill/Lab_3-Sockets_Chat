import { makeStyles } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../contexts/chatContext';

// Logiken för att man ska se vilket rum du är i
// highligta lila när det är samma rum som inloggad user

export default function RoomList() {
	const styled = useStyles();
	const history = useHistory();
	const [passwordInput, showPasswordInput] = useState(false);
	const chatContext = useContext(ChatContext);
	const { allRooms, errors, currentRoom, handleCreateRoom, handleJoinRoom } =
		chatContext;

	const [userSettings, setUserSettings] = useState({
		userName: '',
		room: {
			name: '',
			password: '',
			isNewRoom: true,
		},
	});

	const [userErrors, setUserErrors] = useState({
		roomName: '',
	});

	// If user has been assigned a room, redirect to chatroom
	useEffect(() => {
		if (currentRoom) {
			history.push('/chatroom');
		}
	}, [history, currentRoom]);

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

	const newChatRoom = () => {
		const { password, isNewRoom, name } = userSettings.room;
		const room = { name: name };
		if (isNewRoom) {
			if (checkCreateRoomValidation()) {
				handleCreateRoom(room, password);
			}
		} else {
			handleJoinRoom(room, password);
		}
	};

	return (
		<div className={styled.container}>
			<p>Rooms</p>
			<AddCircle />
			<div className={styled.chatrooms}>
				<ol className={styled.olList}>
					<dt className={styled.roomContainers}>
						<p className={styled.roomName}>Room 1</p>
						{allRooms.map((room) => (
							<dt>{room.name}</dt>
						))}
					</dt>
				</ol>
				<button className={styled.buttonLogout}>Logout</button>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		boxSizing: 'border-box',
	},
	chatrooms: {
		border: '1px solid #F6F6F6',
		width: '28.9%',
		height: '100%',
	},

	olList: {
		padding: '0',
		margin: '0',
	},
	roomContainers: {
		border: '1px solid #F6F6F6',
		height: '4em',
	},

	buttonLogout: {
		position: 'absolute',
		bottom: '3%',
		left: '1rem',
		borderRadius: '10px',
		height: '38px',
		width: '147px',
		color: 'white',
		background: '#897AF2',
		border: 'none',
		fontWeight: 'bold',
	},

	roomName: {
		marginLeft: '2px',
		fontWeight: 'bold',
	},
}));
