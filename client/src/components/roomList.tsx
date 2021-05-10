import { makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { ChatContext } from '../contexts/chatContext';
import CreateRoomModal from './createRoomModal';

export default function RoomList() {
	const chatContext = useContext(ChatContext);
	const { allRooms } = chatContext;
	const styled = useStyles();

	return (
		<div className={styled.container}>
			<div className={styled.olList}>
				<div className={styled.chatroomHeader}>
					<p>Rooms</p>
					<CreateRoomModal />
				</div>
				<ol className={styled.olList}>
					{/* Exempelrum */}
					<dt>Rum 1</dt>
					<div className={styled.roomContainers} />
					{allRooms.map((room) => (
						<dt>{room.name}</dt>
					))}
				</ol>
				<button className={styled.buttonLogout}>Logout</button>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		width: '20%',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	chatroomHeader: {
		background: '#897AF2',
		color: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '1rem 1.5rem',
		backgroundColor: theme.palette.secondary.main,
		'& p': {
			margin: 0,
			fontWeight: 600,
			color: '#ffff',
		},
		'& svg': {
			color: '#ffff',
		},
	},
	olList: {
		flex: 1,
		'& ol': {
			overflowY: 'auto',
			padding: 0,
			margin: 0,
			'& dt': {
				padding: '1rem 1.5rem',
				margin: 0,
				borderBottom: '1px solid #E5E5E5',
			},
		},
	},
	roomContainers: {},
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
