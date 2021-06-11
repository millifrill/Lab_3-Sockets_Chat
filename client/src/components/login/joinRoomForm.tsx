import {
    Button,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
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

export default function JoinRoomForm(props: Props) {
    const { setRoom, setPassword, connect } = props;
    const { allRooms, errors } = useContext(ChatContext);
    const classes = useStyles();
    const [passwordInput, showPasswordInput] = useState(false);

    const handleJoinRoomChange = (index: any) => {
        const room = allRooms[Number(index)];
        setRoom({ name: room.name });
        if (room.hasPassword) {
            showPasswordInput(true);
        }
    };

    return (
        <div className={classes.main}>
            <Select
                fullWidth
                className={classes.input}
                variant='outlined'
                margin='dense'
                error={Boolean(errors.noRoomName)}
                defaultValue={''}
                onChange={(e) => handleJoinRoomChange(e.target.value)}
            >
                {allRooms.map((room, index) => (
                    <MenuItem key={index} value={index}>
                        {room.name}
                    </MenuItem>
                ))}
            </Select>
            {errors.noRoomName ? (
                <p className={classes.errorMessage}>Please choose a room</p>
            ) : null}
            {passwordInput ? (
                <TextField
                    className={classes.input}
                    error={Boolean(errors.wrongPassword || errors.noPassword)}
                    fullWidth
                    type='password'
                    variant='outlined'
                    margin='dense'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            ) : null}
            {errors.noPassword ? (
                <p className={classes.errorMessage}>Please enter a password</p>
            ) : errors.wrongPassword ? (
                <p className={classes.errorMessage}>Incorrect password</p>
            ) : null}
            <Button
                onClick={connect}
                variant='contained'
                color='primary'
                fullWidth
            >
                Join room
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
