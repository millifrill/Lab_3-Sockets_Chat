import { Button, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import logo from '../../chat-icon.png';
import { ChatContext } from '../../contexts/chatContext';

export default function LoginForm() {
    const classes = useStyles();
    const [username, setUsername] = useState<string>('');
    const { errors, handleSetUsername } = useContext(ChatContext);

    const handleChange = (username: string) => {
        setUsername(username);
    };

    const handleConnect = () => {
        handleSetUsername(username);
    };

    return (
        <Paper className={classes.paper} elevation={2}>
            <img alt='Chattastic logo' src={logo}></img>
            <h1>Chattastic</h1>
            <div className={classes.inputContainer}>
                <TextField
                    onChange={(e) => handleChange(e.target.value)}
                    label='Username'
                    margin='dense'
                    fullWidth
                    error={Boolean(errors.noUsername)}
                    variant='outlined'
                />
                {errors.noUsername ? (
                    <p className={classes.errorMessage}>
                        Please enter a username
                    </p>
                ) : null}
            </div>
            <Button
                onClick={handleConnect}
                fullWidth
                color='primary'
                variant='contained'
            >
                Connect
            </Button>
        </Paper>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '30rem',
        margin: 'auto',
        '& img': {
            width: '4rem',
        },
        '& h1': {
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: '2.6rem',
            margin: '0.25rem 0 1.5rem 0',
        },
        '& button': {
            marginTop: '1rem',
        },
    },
    errorMessage: {
        margin: '0.5rem 0 0 0',
        fontStyle: 'italic',
        fontSize: '0.8rem',
        color: 'red',
    },
    inputContainer: {
        width: '100%',
    },
}));
