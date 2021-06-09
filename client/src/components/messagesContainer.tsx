import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useRef } from 'react';
import { Message, ChatContext } from '../contexts/chatContext';
import MessageBubble from './messageBubble';
import MessageIncomingBubble from './MessageIncomingBubble';

export function MessagesContainer() {
    const msgRef = useRef<HTMLInputElement>(null);
    const classes = useStyles();
    const { messages, userName } = useContext(ChatContext);

    useEffect(() => {
        console.log(messages);
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
                    <MessageBubble key={index} message={message} />
                ) : (
                    <MessageIncomingBubble key={index} message={message} />
                )
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: 'white',
        padding: '2rem',
        overflowX: 'auto',
        flex: 1,
    },
}));
