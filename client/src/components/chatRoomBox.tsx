import { makeStyles } from "@material-ui/styles";
import { useState, useContext } from "react";
import { ChatContext } from "../contexts/chatContext";

export default function ChatRoomBox() {
  const styled = useStyles();
  const chatContext = useContext(ChatContext);
  const { handleSendMessage } = chatContext
  const [NewMessage, setNewMessage] = useState({
    message: []
  });

  const [message, setSendMessages] = useState("") // sending messages



  const handleNewMessagesChange = (event: any) => {
    setSendMessages(event.target.value);
  };

  const sendMessages = (e: any) => {
    e.preventDefault()
    handleSendMessage(message);

  };


  return (
    <div className={styled.chatContainer}>
      <ol>
        {/* {NewMessage.map((message) => {
          <li>
            {message}
          </li>
        })} */}
      </ol>
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
    width: "80%",
    height: "92vh",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
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


