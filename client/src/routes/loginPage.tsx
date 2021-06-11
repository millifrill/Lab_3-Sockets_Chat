import TextField from '@material-ui/core/TextField';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../contexts/chatContext';
import { Button, makeStyles, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';

export default function LoginPage() {
    const history = useHistory();
    const styled = useStyles();
    const logoImg = `../assets/logo.png`;
    const [passwordInput, showPasswordInput] = useState(false);
    const chatContext = useContext(ChatContext);
    const { allRooms, errors, userName, handleCreateRoom, handleJoinRoom } =
        chatContext;

    const [userSettings, setUserSettings] = useState({
        userName: '',
        room: {
            name: '',
            password: '',
            isNewRoom: true,
        },
    });

    // If user has been assigned a room, redirect to chatroom
    useEffect(() => {
        if (userName) {
            history.push('/chatroom');
        }
    }, [history, userName]);

    const handleUserNameChange = (name: string) => {
        setUserSettings((prevState) => ({
            ...prevState,
            userName: name,
        }));
    };

    const handleJoinRoomChange = (index: any) => {
        const room = allRooms[Number(index)];
        if (room.hasPassword) {
            showPasswordInput(true);
        }
        setUserSettings((prevState) => ({
            ...prevState,
            room: {
                ...prevState.room,
                name: room.name,
                isNewRoom: false,
            },
        }));
    };

    const handleCreateRoomChange = (name: string) => {
        setUserSettings((prevState) => ({
            ...prevState,
            room: {
                ...prevState.room,
                name: name,
                isNewRoom: true,
            },
        }));
    };

    const handlePasswordChange = (password: string) => {
        setUserSettings((prevState) => ({
            ...prevState,
            room: {
                ...prevState.room,
                password: password,
            },
        }));
    };

    const connect = () => {
        const { userName } = userSettings;
        const { password, isNewRoom, name } = userSettings.room;
        const room = { name: name };
        if (isNewRoom) {
            handleCreateRoom(room, password);
        } else {
            handleJoinRoom(room, password);
        }
    };

    return (
        <div className={styled.mainContent}>
            <img src={logoImg} alt='Chattastic logo' className={styled.logo} />
            <h1 className={styled.title}>Chattastic</h1>
            <div className={styled.formBox}>
                <TextField
                    label='Username'
                    variant='outlined'
                    margin='dense'
                    fullWidth
                    error={Boolean(errors.noUsername)}
                    placeholder='Enter username'
                    onChange={(e) => handleUserNameChange(e.target.value)}
                />
                {errors.noUsername ? (
                    <p className={styled.errorMessage}>
                        Please enter a username
                    </p>
                ) : null}
                {allRooms.length ? (
                    <>
                        {/* <p>Choose a room to join</p>
                        <Select
                            fullWidth
                            variant='outlined'
                            margin='dense'
                            defaultValue={''}
                            onChange={(e) =>
                                handleJoinRoomChange(e.target.value)
                            }
                        >
                            {allRooms.map((room, index) => (
                                <MenuItem key={index} value={index}>
                                    {room.name}
                                </MenuItem>
                            ))}
                        </Select> */}
                        {passwordInput ? (
                            <TextField
                                fullWidth
                                variant='outlined'
                                margin='dense'
                                placeholder='Enter room password'
                                onChange={(e) =>
                                    handlePasswordChange(e.target.value)
                                }
                            />
                        ) : null}
                        {errors.wrongPassword ? (
                            <p className={styled.errorMessage}>
                                Incorrect password
                            </p>
                        ) : null}
                    </>
                ) : null}
                <p>Create a new chatroom</p>
                <TextField
                    fullWidth
                    error={Boolean(
                        errors.noRoomName || errors.roomNameAlreadyInUse
                    )}
                    variant='outlined'
                    margin='dense'
                    placeholder='Enter room name'
                    onChange={(e) => handleCreateRoomChange(e.target.value)}
                />
                {errors.noRoomName ? (
                    <p className={styled.errorMessage}>
                        Please enter a room name
                    </p>
                ) : errors.roomNameAlreadyInUse ? (
                    <p className={styled.errorMessage}>
                        Room name is already in use
                    </p>
                ) : null}
                <TextField
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    placeholder='Enter password (optional)'
                    type='password'
                    onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <Button
                    fullWidth
                    onClick={connect}
                    variant='contained'
                    color='primary'
                >
                    Connect
                </Button>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    mainContent: {
        width: '100%',
        minHeight: '100vh',
        padding: '2.5rem 1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    },
    logo: {
        width: '3.5rem',
    },
    title: {
        fontSize: '2rem',
        margin: '0.5rem 0 1.5rem 0',
        color: theme.palette.primary.main,
    },
    formBox: {
        display: 'flex',
        width: '100%',
        maxWidth: '18rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    errorMessage: {
        margin: '0.5rem 0 0 0',
        fontStyle: 'italic',
        fontSize: '0.8rem',
        color: 'red',
    },
}));
