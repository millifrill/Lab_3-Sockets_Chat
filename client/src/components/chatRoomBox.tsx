import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

export default function ChatRoomBox() {
	const styled = useStyles();
	const [NewMessage, setNewMessage] = useState('');

	const handleNewMessageChange = (event: any) => {
		setNewMessage(event.target.value);
	};

	const sendMessages = () => {
		console.log('button');
	};

	return (
		<div className={styled.chatContainer}>
			{/* <ol>
				<dt></dt>
			</ol> */}
			<textarea
				className={styled.textarea}
				placeholder='Write a message.....'
				value={NewMessage}
				onChange={handleNewMessageChange}
			/>
			<button className={styled.buttonSend} onClick={sendMessages}>
				Send
			</button>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	chatContainer: {
		display: 'flex',
		flexDirection: 'row',
		border: '1px solid #DCD9F2',
		// marginLeft: '26em',
		width: '80%',
		height: '90vh',
		position: 'relative',
		overflow: 'hidden',
		// [theme.breakpoints.down('sm')]: {
		// 	width: '100%',
		// },
	},
	textarea: {
		position: 'absolute',
		bottom: '0',
		background: '#F6F6F6',
		width: '100%',
		height: '5rem',
		textDecoration: 'none',
		border: 'none',
		outline: 'none',
	},
	buttonSend: {
		position: 'absolute',
		background: '#897AF2',
		borderRadius: '10px',
		fontWeight: 'bold',
		height: '2rem',
		width: '4rem',
		border: 'none',
		color: '#ffff',
		bottom: '2%',
		right: '2%',
	},
}));
