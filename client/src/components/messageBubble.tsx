import { makeStyles } from "@material-ui/styles";
import { useContext } from "react";
import { ChatContext, Message } from "../contexts/chatContext";

interface messageBubble {
	message: Message;
}

function MessageBubble(props: messageBubble) {
	const styled = useStyles();
	const { message } = props;

	console.log(props);
	return (
		<div className={styled.messageBubble}>
			<div className={styled.incomingMessage}>
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
		alignItems: 'flex-start'
		// display: "table",
	},
	username: {
		fontSize: "10px",
		color: "black",
	},
}));

export default MessageBubble;
