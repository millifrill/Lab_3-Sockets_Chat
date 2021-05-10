import { makeStyles } from "@material-ui/styles";
import { useContext } from "react";
import { ChatContext, Message } from "../contexts/chatContext";

interface hej {
    message: Message
}

function MessageBubble(props: hej) {
    const styled = useStyles();
    const { message } = props
    const chatContext = useContext(ChatContext);
    const { messages } = chatContext;

    console.log(props)
    return (

        <div className={styled.messageBubble}>
            <div className={styled.incomingMessage}>
                <p>{message.message}</p>
            </div>
            <div className={styled.sentMessage}>
                <p>{message.userName}</p>
            </div>
        </div>


    )
};

const useStyles = makeStyles((theme) => ({
    messageBubble: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',

    },

    incomingMessage: {
        border: '1px solid #E8E4FF',
        borderRadius: '0.6rem',
        backgroundColor: '#E8E4FF',
        height: '3.5rem',
        width: '30%',
        padding: '0.3rem',
        color: 'white',
        marginTop: '0.3rem',

    },
    sentMessage: {
        border: '1px solid #897AF2',
        borderRadius: '0.6rem',
        backgroundColor: '#897AF2',
        height: '3.5rem',
        width: '30%',
        padding: '0.3rem',
        color: 'white',
        marginTop: '1.5rem',

    }

}))

export default MessageBubble;