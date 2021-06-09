import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useState } from 'react';
import { ChatContext } from '../contexts/chatContext';

export default function ChatRoomBox() {
    const styled = useStyles();
    const { handleSendMessage } = useContext(ChatContext);
    const [message, setMessage] = useState('');

    const handleNewMessagesChange = (event: any) => {
        setMessage(event.target.value);
    };

    const sendMessages = (e: any) => {
        e.preventDefault();
        console.log(message);
        handleSendMessage(message);
        setMessage('');
    };

    const sendOnKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            console.log('Enter');
            handleSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className={styled.chatContainer}>
            <div className={styled.inputContainer}>
                <input
                    className={styled.textarea}
                    placeholder='Write a message.....'
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
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        padding: '1rem 1.5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: '#F6F6F6',
    },
    textarea: {
        background: '#F6F6F6',
        width: '100%',
        height: '3rem',
        textDecoration: 'none',
        border: 'none',
        outline: 'none',
    },
    buttonSend: {
        fontWeight: 600,
        width: '4rem',
        marginLeft: '1rem',
        background: '#897AF2',
        color: '#ffff',
    },
}));
