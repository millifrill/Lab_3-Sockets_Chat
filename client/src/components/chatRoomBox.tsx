import { Message } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState, useContext } from "react";
import { ChatContext } from "../contexts/chatContext";

export default function ChatRoomBox() {
  const styled = useStyles();
  const chatContext = useContext(ChatContext);
  const { handleSendMessage } = chatContext
  const [NewMessage, setNewMessage] = useState([]);
  const [sendMessages, setSendMessages] = useState("")



  const handleNewMessagesChange = (event: any) => {
    setNewMessage(event.target.value);
  };

  const sendMessages = (e) => {
    e.preventDefault()
    sendMessages("");

  };


  return (
    <div className={styled.chatContainer}>
      <ol>
        {Message.map((message) => (
          
        ))}
        <li>

        </li>
      </ol>
      <textarea
        className={styled.textarea}
        placeholder="Write a message....."
        value={NewMessage}
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
    border: "1px solid #DCD9F2",
    marginLeft: "26em",
    width: "72%",
    height: "43em",
    position: "relative",
    overflow: "hidden",
    display: "inline-block",
  },
  textarea: {
    position: "absolute",
    bottom: "0",
    background: "#F6F6F6",
    width: "99.5%",
    height: "5rem",
    textDecoration: "none",
    border: "none",
    outline: "none",
  },
  buttonSend: {
    position: "absolute",
    bottom: "0",
    right: "0",
  },
}));


