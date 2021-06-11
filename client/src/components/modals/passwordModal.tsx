import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ChatContext, Room } from '../../contexts/chatContext';
import { DialogContentText } from '@material-ui/core';

interface Props {
    setPasswordModal: React.Dispatch<
        React.SetStateAction<{
            room: Room;
            isOpen: boolean;
        }>
    >;
    passwordModal: {
        room: Room;
        isOpen: boolean;
    };
}

export default function PasswordModal(props: Props) {
    const { setPasswordModal, passwordModal } = props;
    const [password, setPassword] = useState('');
    const chatContext = useContext(ChatContext);
    const { handleJoinRoom, currentRoom, errors } = chatContext;
    const classes = useStyles();

    // If user has been assigned a room, close modal
    useEffect(() => {
        if (!errors.wrongPassword && !errors.noPassword) {
            setPasswordModal((prevState) => ({
                ...prevState,
                isOpen: false,
            }));
        }
    }, [currentRoom, setPasswordModal, errors]);

    const handleClose = () => {
        setPasswordModal((prevState) => ({
            ...prevState,
            isOpen: false,
        }));
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
    };

    const handleRoomChange = () => {
        handleJoinRoom(passwordModal.room, password);
    };

    return (
        <div>
            <Dialog
                fullWidth={true}
                open={passwordModal.isOpen}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle
                    id='form-dialog-title'
                    className={classes.modalTitle}
                >
                    Password
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter password to join room.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin='dense'
                        id='password'
                        error={Boolean(
                            errors.noPassword || errors.wrongPassword
                        )}
                        label='Password'
                        type='password'
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        fullWidth
                    />
                    {errors.wrongPassword ? (
                        <p className={classes.errorMessage}>
                            Incorrect password
                        </p>
                    ) : errors.noPassword ? (
                        <p className={classes.errorMessage}>
                            Please enter a password
                        </p>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleRoomChange}
                        color='primary'
                        variant='contained'
                    >
                        Enter room
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        errorMessage: {
            margin: '0.5rem 0 0 0',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            color: 'red',
        },
        modalTitle: {
            color: 'black',
            fontSize: '1.2rem',
            fontWeight: 800,
        },
    })
);
