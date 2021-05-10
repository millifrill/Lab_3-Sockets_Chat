

import { makeStyles } from "@material-ui/styles";
import { useContext, useState } from "react";
import { ChatContext } from "../contexts/chatContext";
import MessageBubble from "./messageBubble";



export default function ChatRoomBox(props: { messages?: any; }) {
	const styled = useStyles();
	const chatContext = useContext(ChatContext);
	const { handleSendMessage, messages } = chatContext


	const [newMessage, setNewMessage] = useState("")
	const [message, setSendMessages] = useState("")



	const handleNewMessagesChange = (event: any) => {
		setSendMessages(event.target.value);
	};

	const sendMessages = (e: any) => {
		e.preventDefault()
		console.log(messages)
		handleSendMessage(message);

	};


	return (
		<div className={styled.chatContainer}>

			{messages.map((AllMessage) => (
				<li>
					<MessageBubble message={AllMessage} />
				</li>
			)

			)
			}
			<textarea
				className={styled.textarea}
				placeholder="Write a message....."
				value={message}
				onChange={handleNewMessagesChange}
			/>
			<button className={styled.buttonSend} onClick={sendMessages}>
				Send
      </button>

		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	chatContainer: {

		display: "flex",
		flexDirection: "row",
		border: "1px solid #DCD9F2",
		width: "100%",
		height: "92vh",
		position: "relative",
		overflow: "hidden",

	},
	textarea: {
		position: "absolute",
		bottom: "0",
		background: "#F6F6F6",
		width: "100%",
		height: "5rem",
		textDecoration: "none",
		border: "none",
		outline: "none",
	},
	buttonSend: {
		position: "absolute",
		background: "#897AF2",
		borderRadius: "10px",
		fontWeight: "bold",


		height: "2rem",
		width: "4rem",
		border: "none",
		color: "#ffff",
		bottom: "2%",
		right: "2%",

	},
}));


