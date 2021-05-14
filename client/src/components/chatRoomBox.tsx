import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../contexts/chatContext";
import MessageBubble from "./messageBubble";
import MessageIncomingBubble from "./MessageIncomingBubble";

export default function ChatRoomBox(props: { messages?: any }) {
	const styled = useStyles();
	const msgRef = useRef<HTMLInputElement>(null);
	const chatContext = useContext(ChatContext);
	const { currentRoom, handleSendMessage, messages, userName } = chatContext;
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

	const sendOnKeyPress = (event: any) => {
		if (event.key === "Enter") {
			console.log("Enter");
			handleSendMessage(message);
			setSendMessages("");
		}
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
			<div className={styled.currentRoomHeader}>
				<p className={styled.currentRoomName}>{currentRoom}</p>
			</div>
			<div className={styled.ListMessages} ref={msgRef}>
				{messages.map((AllMessage, index) =>
					AllMessage.userName === userName ? (
						<MessageBubble key={index} message={AllMessage} />
					) : (
						<MessageIncomingBubble key={index} message={AllMessage} />
					),
				)}
			</div>
			<div className={styled.inputContainer}>
				<input
					className={styled.textarea}
					placeholder="Write a message....."
					value={message}
					onChange={handleNewMessagesChange}
					onKeyPress={sendOnKeyPress}
				/>
				<Button className={styled.buttonSend} onClick={sendMessages}>
					Send
				</Button>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	chatContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
	},
	currentRoomHeader: {
		borderBottom: "1px solid #DCD9F2",
		width: "100%",
		height: "3.5rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	currentRoomName: {
		marginLeft: "1.5rem",
		fontWeight: 600,
	},
	ListMessages: {
		flex: 1,
		overflowY: "auto",
		padding: "1rem",
	},
	inputContainer: {
		width: "100%",
		padding: "1rem 1.5rem",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		background: "#F6F6F6",
	},
	textarea: {
		background: "#F6F6F6",
		width: "100%",
		height: "3rem",
		textDecoration: "none",
		border: "none",
		outline: "none",
	},
	buttonSend: {
		fontWeight: 600,
		width: "4rem",
		marginLeft: "1rem",
		background: "#897AF2",
		color: "#ffff",
	},
}));
