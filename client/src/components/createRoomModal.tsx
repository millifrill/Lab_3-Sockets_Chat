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

export default function CreateRoomModal() {
    const history = useHistory();
    const classes = useStyles();
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
        if (!userErrors.roomName && !errors.roomNameAlreadyInUse) {
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
        <div>
            <AddCircle onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>
                    Create a new chat room
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        error={Boolean(errors.roomNameAlreadyInUse)}
                        required
                        margin='dense'
                        id='chatroom'
                        label='Enter room name'
                        onChange={(e) => handleCreateRoomChange(e.target.value)}
                        fullWidth
                    />
                    {errors.roomNameAlreadyInUse ? (
                        <p className={classes.errorMessage}>
                            Room name already in use
                        </p>
                    ) : null}
                    <TextField
                        margin='dense'
                        id='password'
                        label='Enter password (optional)'
                        type='password'
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={createRoom}
                        color='primary'
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
        errorMessage: {
            margin: '0.5rem 0 0 0',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            color: 'red',
        },
    })
);
