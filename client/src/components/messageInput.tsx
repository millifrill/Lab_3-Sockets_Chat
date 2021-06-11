import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useState } from 'react';
import { ChatContext } from '../contexts/chatContext';
import { Send } from '@material-ui/icons';

export default function MessageInput() {
    const classes = useStyles();
    const { handleSendMessage, errors, handleTyping } = useContext(ChatContext);
    const [message, setMessage] = useState('');

    const handleNewMessagesChange = (event: any) => {
        setMessage(event.target.value);
        handleTyping(event.target.value);
    };

    const sendMessage = () => {
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
        <div className={classes.messageContainer}>
            <div className={classes.inputContainer}>
                <TextField
                    placeholder='Write a message.....'
                    margin='dense'
                    error={Boolean(errors.noMessage)}
                    value={message}
                    required
                    size='small'
                    multiline
                    fullWidth
                    onChange={handleNewMessagesChange}
                    onKeyPress={sendOnKeyPress}
                />
            </div>
            <Send
                className={classes.send}
                color='primary'
                onClick={sendMessage}
            />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    messageContainer: {
        width: '100%',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'start',
        background: '#F6F6F6',
    },
    inputContainer: {
        width: '100%',
    },
    send: {
        margin: '0.5rem 0 0.5rem 1rem',
        transform: 'rotate(-20deg)',
    },
}));
