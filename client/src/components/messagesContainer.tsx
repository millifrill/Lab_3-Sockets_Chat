import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useRef } from 'react';
import { Message, ChatContext } from '../contexts/chatContext';
import OutgoingMessageBubble from './outgoingMessageBubble';
import IncomingMessageBubble from './incomingMessageBubble';

export function MessagesContainer() {
    const msgRef = useRef<HTMLInputElement>(null);
    const classes = useStyles();
    const { messages, userName, currentlyTyping } = useContext(ChatContext);

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
        <div className={classes.root}>
            <div className={classes.content} ref={msgRef}>
                {messages.map((message: Message, index: number) =>
                    message.userName === userName ? (
                        <OutgoingMessageBubble key={index} message={message} />
                    ) : (
                        <IncomingMessageBubble key={index} message={message} />
                    )
                )}
            </div>
            {currentlyTyping.length ? (
                <p className={classes.typing}>
                    {currentlyTyping.join(', ')} is typing...
                </p>
            ) : null}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    content: {
        padding: '1.5rem',
        overflowX: 'auto',
        flex: 1,
    },
    typing: {
        fontStyle: 'italic',
        color: 'grey',
        margin: '0.5rem 1.5rem',
    },
}));
