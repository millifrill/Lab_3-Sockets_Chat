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
			<div className={styled.sentMessage}>
				<p>{message.message}</p>
				<p className={styled.username}>{message.userName}</p>
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

	sentMessage: {
		border: "1px solid #897AF2",
		borderRadius: "0.6rem",
		backgroundColor: "#897AF2",
		height: "3.5rem",
		width: "30%",
		padding: "0.3rem",
		color: "white",
		marginTop: "5vh",
		marginLeft: "67%",
		// display: "table",
	},
	username: {
		fontSize: "10px",
		color: "black",
	},
}));

export default MessageBubble;
