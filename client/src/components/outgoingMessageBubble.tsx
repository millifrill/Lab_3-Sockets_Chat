import { makeStyles } from '@material-ui/styles';
import { Message } from '../contexts/chatContext';

interface messageBubble {
    message: Message;
}

export default function OutgoingMessageBubble(props: messageBubble) {
    const styled = useStyles();
    const { message } = props;

    console.log(props);
    return (
        <div className={styled.messageBubble}>
            <div className={styled.sentMessage}>
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
        alignItems: 'flex-end',
    },
    sentMessage: {
        border: '1px solid #897AF2',
        borderRadius: '0.6rem',
        backgroundColor: '#897AF2',
        width: '100%',
        maxWidth: '20rem',
        padding: '0.5rem',
        color: 'white',
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
