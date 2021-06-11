import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { ChatContext } from '../../contexts/chatContext';

interface Props {
    connect: () => void;
    setRoom: React.Dispatch<
        React.SetStateAction<{
            name: string;
        }>
    >;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function NewRoomForm(props: Props) {
    const { setRoom, setPassword, connect } = props;
    const { errors } = useContext(ChatContext);
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <TextField
                fullWidth
                className={classes.input}
                variant='outlined'
                margin='dense'
                error={Boolean(
                    errors.noRoomName || errors.roomNameAlreadyInUse
                )}
                placeholder='Room name'
                onChange={(e) => setRoom({ name: e.target.value })}
            />
            {errors.noRoomName ? (
                <p className={classes.errorMessage}>Please enter a room name</p>
            ) : errors.roomNameAlreadyInUse ? (
                <p className={classes.errorMessage}>
                    Room name is already in use
                </p>
            ) : null}
            <TextField
                className={classes.input}
                fullWidth
                variant='outlined'
                margin='dense'
                type='password'
                placeholder='Password (optional)'
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                onClick={connect}
                variant='contained'
                color='primary'
                fullWidth
            >
                Create room
            </Button>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        '& button': {
            marginTop: '1rem',
        },
    },
    input: {
        marginTop: '1rem',
    },
    errorMessage: {
        margin: '0.5rem 0 0 0',
        fontStyle: 'italic',
        fontSize: '0.8rem',
        color: 'red',
    },
}));
