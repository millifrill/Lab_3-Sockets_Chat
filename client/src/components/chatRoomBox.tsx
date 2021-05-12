import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../contexts/chatContext";
import MessageBubble from "./messageBubble";
import MessageIncomingBubble from "./MessageIncomingBubble";

export default function ChatRoomBox(props: { messages?: any }) {
	const styled = useStyles();
	const msgRef = useRef<HTMLInputElement>(null);
	const chatContext = useContext(ChatContext);
	const { handleSendMessage, messages, userName } = chatContext;
	const [message, setSendMessages] = useState("");

	const handleNewMessagesChange = (event: any) => {
		setSendMessages(event.target.value);
	};

	const sendMessages = (e: any) => {
		e.preventDefault();
		console.log(message);
		handleSendMessage(message);
		setSendMessages("");
	};

	useEffect(() => {
		if (msgRef && msgRef.current) {
			const msgElement = msgRef.current;
			msgElement.scroll({
				top: msgElement.scrollHeight,
				left: 0,
				behavior: "smooth",
			});
		}
	}, [msgRef, messages]);

	return (
		<div className={styled.chatContainer}>
			<div className={styled.ListMessages} ref={msgRef}>
				{messages.map((AllMessage, index) =>
					AllMessage.userName === userName ? (
						<MessageBubble key={index} message={AllMessage} />
					) : (
						<MessageIncomingBubble key={index} message={AllMessage} />
					),
				)}
			</div>
			<input
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
	},
	ListMessages: {
		flex: 1,
		overflowY: "scroll",
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
		bottom: "5%",
		right: "2%",
		cursor: "pointer",
	},
}));
