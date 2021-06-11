import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useRef } from 'react';
import { Message, ChatContext } from '../contexts/chatContext';
import OutgoingMessageBubble from './outgoingMessageBubble';
import IncomingMessageBubble from './incomingMessageBubble';

export function MessagesContainer() {
    const msgRef = useRef<HTMLInputElement>(null);
    const classes = useStyles();
    const { messages, userName } = useContext(ChatContext);

    useEffect(() => {
        if (msgRef && msgRef.current) {
            const msgElement = msgRef.current;
            msgElement.scroll({
                top: msgElement.scrollHeight,
                left: 0,
                behavior: 'smooth',
            });
        }
    }, [msgRef, messages]);

    return (
        <div className={classes.content} ref={msgRef}>
            {messages.map((message: Message, index: number) =>
                message.userName === userName ? (
                    <OutgoingMessageBubble key={index} message={message} />
                ) : (
                    <IncomingMessageBubble key={index} message={message} />
                )
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: 'white',
        padding: '1.5rem',
        overflowX: 'auto',
        flex: 1,
    },
}));
