import { Button, makeStyles } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { useContext } from 'react';
import { ChatContext } from '../contexts/chatContext';
import CreateRoomModal from './createRoomModal';

export default function MobileRoomList() {
	const chatContext = useContext(ChatContext);
	const { allRooms } = chatContext;
	const styled = useStyles();
	return (
		<div className={styled.container}>
			<div className={styled.listHeader}>
				<p>Rooms</p>
				<AddCircle />
				{CreateRoomModal}
			</div>
			<div className={styled.roomList}>
				<ol>
					{/* Exempelrum */}
					<dt>Rum 1</dt>
					{allRooms.map((room) => (
						<dt>{room.name}</dt>
					))}
				</ol>
			</div>
			<div className={styled.buttonContainer}>
				<Button variant='contained' color='secondary'>
					Logout
				</Button>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		top: '5rem',
		height: 'calc(100% - 5rem)',
		backgroundColor: '#ffff',
		maxWidth: '100%',
		width: '18rem',
		borderRight: '1px solid #E5E5E5',
		zIndex: 100,
	},
	listHeader: {
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
	roomList: {
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
	buttonContainer: {
		padding: '2rem 1.5rem',
		'& button': {
			width: '100%',
			textTransform: 'capitalize',
			fontWeight: 600,
		},
	},
}));
