import { Button, makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { ChatContext, Room } from '../contexts/chatContext';
import CreateRoomModal from './createRoomModal';
import LockIcon from '@material-ui/icons/Lock';

interface Props {
	setPasswordModal: React.Dispatch<
		React.SetStateAction<{
			room: Room;
			isOpen: boolean;
		}>
	>;
}

export default function MobileRoomList(props: Props) {
	const { setPasswordModal } = props;
	const chatContext = useContext(ChatContext);
	const { allRooms, handleJoinRoom } = chatContext;
	const styled = useStyles();

	const handleRoomChange = (room: Room) => {
		if (room.hasPassword) {
			setPasswordModal({
				room: room,
				isOpen: true,
			});
		} else {
			handleJoinRoom(room);
		}
	};

	return (
		<div className={styled.container}>
			<div className={styled.listHeader}>
				<p>Rooms</p>
				<CreateRoomModal />
			</div>
			<div className={styled.roomList}>
				<ol>
					{allRooms.map((room) => (
						<dt onClick={() => handleRoomChange(room)}>
							{room.name}
							{room.hasPassword ? (
								<LockIcon color='primary' fontSize='small' />
							) : null}
						</dt>
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
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
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
