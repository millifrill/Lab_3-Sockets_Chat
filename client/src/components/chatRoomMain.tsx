import { makeStyles, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import { colorTheme } from '../styling/colorTheme';
import image from '../chat-icon.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// skapa hamburgarmeny vid mobile

function ChatRoom() {
	const styled = useStyles();
	const [NewMessage, setNewMessage] = useState('');
	const handleNewMessageChange = (event: any) => {
		setNewMessage(event.target.value);
	};
	const sendMessages = () => {
		console.log('button');
	};

	return (
		<ThemeProvider theme={colorTheme}>
			<div className={styled.header}>
				<img className={styled.image} src={image} alt='chat-pic' />
				<h4 className={styled.title}>Chattastic</h4>
				<p className={styled.userName}>User123</p>
			</div>
			<div className={styled.container}>
				<div className={styled.chatrooms}>
					<ol className={styled.olList}>
						<dt className={styled.roomContainers}>
							<p className={styled.roomName}>Room 1</p>
						</dt>
					</ol>
					<button className={styled.buttonLogout}>Logout</button>
				</div>
				<div className={styled.chatContainer}>
					<ol>
						<dt className={styled.messages}>Hejsan</dt>
					</ol>
					<textarea
						className={styled.textarea}
						placeholder='Write a message.....'
						value={NewMessage}
						onChange={handleNewMessageChange}
					/>
					<button className={styled.buttonSend} onClick={sendMessages}>
						Send
					</button>
					{/* <FontAwesomeIcon icon={["fab", "apple"]} color="#5a0505" /> */}
				</div>
			</div>
		</ThemeProvider>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		boxSizing: 'border-box',
		height: '100%',
	},
	chatContainer: {
		border: '1px solid #DCD9F2',
		margin: 'auto',
		width: '78%',
		height: '43em',
		position: 'relative',
		overflow: 'hidden',
		display: 'inline-block',
	},
	roomContainers: {
		border: '1px solid #F6F6F6',
		height: '4em',
	},
	textarea: {
		position: 'absolute',
		bottom: '0',
		background: '#F6F6F6',
		width: '99.5%',
		height: '5rem',
		textDecoration: 'none',
		border: 'none',
		outline: 'none',
	},
	buttonSend: {
		position: 'absolute',
		bottom: '0',
		right: '0',
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
	messages: {
		border: '1px solid #897AF2',
		borderRadius: '10px',
		backgroundColor: '#897AF2',
		height: '3em',
		width: '30%',
		padding: ' 5px',
	},
	header: {
		boxSizing: 'border-box',
		padding: '10px',
		background: 'white',
		color: '#897AF2',
		border: '1px solid #F6F6F6',
		display: 'flex',
	},
	title: {
		textAlign: 'left',
		marginLeft: '2rem',
		fontSize: '1.3rem',
	},
	image: {
		width: '65px',
		marginLeft: '1.5rem',
	},
	userName: {
		position: 'absolute',
		left: '95%',
		fontSize: '1vw',
		paddingTop: '1rem',
		fontWeight: 'bold',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
			paddingTop: '1rem',
			left: '80%',
		},
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
	roomName: {
		paddingLeft: '0.7rem',
		fontWeight: 'bold',
	},
}));

export default ChatRoom;
