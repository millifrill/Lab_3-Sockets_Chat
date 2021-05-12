import { makeStyles } from "@material-ui/styles";
import { Message } from "../contexts/chatContext";

interface messageBubble {
	message: Message;
}

function MessageBubble(Props: messageBubble) {
	const styled = useStyles();
	const { message } = Props;

	return (
		<div className={styled.messageBubble}>
			<div className={styled.incomingMessage}>
				<p className={styled.username}>{message.userName}</p>
				<p className={styled.messageText}>{message.message}</p>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	messageBubble: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		boxSizing: "border-box",
		overflowY: "scroll",
	},
	incomingMessage: {
		border: "1px solid #E8E4FF",
		borderRadius: "0.6rem",
		backgroundColor: "#E8E4FF",
		height: "3.5rem",
		width: "30%",
		padding: "0.3rem",
		color: "black",
		marginTop: "0.7rem",
		marginLeft: "1em",
		display: 'flex',
	
	},

	messageText: {
		fontSize: '11px',
		marginLeft: '0.8rem',
	},
	username: {
		fontSize: "10px",
		color: "black",
		fontWeight: 600,
		marginTop: '0.1rem',
	},
}));

export default MessageBubble;
