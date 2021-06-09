import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useHistory } from 'react-router';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddCircle } from '@material-ui/icons';
import { ChatContext } from '../contexts/chatContext';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DialogContentText } from '@material-ui/core';

export default function CreateRoomModal() {
    const history = useHistory();
    const styled = useStyles();
    const [open, setOpen] = React.useState(false);
    const chatContext = useContext(ChatContext);
    const { errors, currentRoom, handleCreateRoom } = chatContext;

    const [userSettings, setUserSettings] = useState({
        userName: '',
        room: {
            name: '',
            password: '',
            isNewRoom: true,
        },
    });

    const [userErrors, setUserErrors] = useState({
        userName: '',
        roomName: '',
    });

    useEffect(() => {
        if (currentRoom) {
            history.push('/chatroom');
        }
    }, [history, currentRoom]);

    const handleCreateRoomChange = (name: string) => {
        if (!name) {
            setUserErrors((prevState) => ({
                ...prevState,
                roomName: 'Please enter a room name',
            }));
        } else {
            setUserErrors((prevState) => ({
                ...prevState,
                roomName: '',
            }));
        }
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

    function checkCreateRoomValidation() {
        if (!userErrors.roomName && userSettings.room.name) {
            return true;
        } else {
            setUserErrors((prevState) => ({
                ...prevState,
                roomName: 'Please enter a room name',
            }));
            return false;
        }
    }

    const createRoom = () => {
        const { password, name } = userSettings.room;
        const room = { name: name };
        if (checkCreateRoomValidation()) {
            handleCreateRoom(room, password);
            handleClose();
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styled.modalBox}>
            <AddCircle onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle
                    id='form-dialog-title'
                    className={styled.modalTitle}
                >
                    Create a new chat room
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={styled.dialogContentText}>
                        Enter name of chat room{' '}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='chatroom'
                        label='Enter room name'
                        variant='outlined'
                        onChange={(e) => handleCreateRoomChange(e.target.value)}
                        fullWidth
                    />
                    <p className={styled.errorMessage}>
                        {userErrors.roomName ? userErrors.roomName : null}
                    </p>
                    <p className={styled.errorMessage}>
                        {errors.roomNameAlreadyInUse
                            ? 'Room name already in use'
                            : null}
                    </p>
                    <DialogContentText className={styled.dialogContentText}>
                        Enter chat room password (optional)
                    </DialogContentText>
                    <TextField
                        margin='dense'
                        id='password'
                        label='Enter password'
                        type='password'
                        variant='outlined'
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary'>
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={createRoom}
                        color='secondary'
                    >
                        Create room
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalBox: {
            height: '1.5rem',
            maxWidth: '10rem',
        },
        imgStyle: {
            width: '5rem',
            alignSelf: 'center',
        },
        modalTitle: {
            color: 'black',
            fontSize: '1.2rem',
            fontWeight: 800,
        },
        dialogContentText: {
            color: '#7361EF',
            margin: 0,
        },
        errorMessage: {
            color: 'red',
            fontSize: '0.8rem',
            margin: '0 0 1rem 0',
        },
    })
);
