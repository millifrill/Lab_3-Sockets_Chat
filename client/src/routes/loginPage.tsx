import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/login/loginForm';
import RoomForm from '../components/login/roomForm';
import { ChatContext } from '../contexts/chatContext';

export default function LoginPage() {
    const history = useHistory();
    const [roomType, setRoomType] = useState<'NEW' | 'CURRENT'>('NEW');
    const [room, setRoom] = useState({ name: '' });
    const [password, setPassword] = useState('');
    const { userName, currentRoom, handleCreateRoom, handleJoinRoom } =
        useContext(ChatContext);
    const classes = useStyles();

    useEffect(() => {
        if (userName && currentRoom) {
            history.push('/chatroom');
        }
    }, [userName, currentRoom, history]);

    const connect = () => {
        if (roomType === 'NEW') {
            handleCreateRoom(room, password);
        } else {
            handleJoinRoom(room, password);
        }
    };

    return (
        <div className={classes.main}>
            {!userName ? (
                <LoginForm />
            ) : (
                <RoomForm
                    connect={connect}
                    setRoom={setRoom}
                    setPassword={setPassword}
                    roomType={roomType}
                    setRoomType={setRoomType}
                />
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
