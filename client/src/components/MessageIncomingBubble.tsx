import { makeStyles } from "@material-ui/styles";
import { useContext, useRef } from "react";
import { ChatContext, Message } from "../contexts/chatContext";

interface hej {
    message: Message
}

function MessageBubble(props: hej) {
    const styled = useStyles();
    const { message } = props
    const chatContext = useContext(ChatContext);
    const { messages } = chatContext;

    return (

        <div className={styled.messageBubble}>
            <div className={styled.incomingMessage}>
                <p className={styled.username}>{message.userName}</p>
                <p>{message.message}</p>
            </div>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    messageBubble: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        overflowY: 'scroll',
    },

    incomingMessage: {
        border: '1px solid #E8E4FF',
        borderRadius: '0.6rem',
        backgroundColor: '#E8E4FF',
        height: '3.5rem',
        width: '30%',
        padding: '0.3rem',
        color: 'black',
        marginTop: '0.3rem',
        left: '1em',
    },
    username: {
        fontSize: '10px',
        color: 'black',
    }
}))

export default MessageBubble;