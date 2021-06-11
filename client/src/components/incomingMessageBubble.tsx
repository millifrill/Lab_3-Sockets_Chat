import { makeStyles } from '@material-ui/styles';
import { Message } from '../contexts/chatContext';

interface messageBubble {
    message: Message;
}

export default function IncomingMessageBubble(Props: messageBubble) {
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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    incomingMessage: {
        border: '1px solid #E8E4FF',
        borderRadius: '0.6rem',
        backgroundColor: '#E8E4FF',
        width: '100%',
        maxWidth: '20rem',
        padding: '0.5rem',
        color: 'black',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    messageText: {
        margin: '0.5rem 0',
        fontSize: '12px',
    },
    username: {
        margin: 0,
        fontSize: '10px',
        fontWeight: 600,
    },
}));
