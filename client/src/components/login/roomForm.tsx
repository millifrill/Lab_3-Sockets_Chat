import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import React, { ChangeEvent, useContext } from 'react';
import { ChatContext } from '../../contexts/chatContext';
import JoinRoomForm from './joinRoomForm';
import NewRoomForm from './newRoomForm';

interface Props {
    connect: () => void;
    setRoom: React.Dispatch<
        React.SetStateAction<{
            name: string;
        }>
    >;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setRoomType: React.Dispatch<React.SetStateAction<'NEW' | 'CURRENT'>>;
    roomType: 'NEW' | 'CURRENT';
}

export default function RoomForm(props: Props) {
    const { setRoomType, roomType, setRoom, setPassword, connect } = props;
    const { allRooms } = useContext(ChatContext);
    const classes = useStyles();
    console.log(allRooms);

    const handleChange = (e: ChangeEvent<{}>, value: 'NEW' | 'CURRENT') => {
        setRoomType(value);
    };

    return (
        <Paper className={classes.paper} elevation={2}>
            <Tabs
                onChange={handleChange}
                value={roomType}
                indicatorColor='primary'
                textColor='primary'
                centered
            >
                <Tab value='NEW' label='New room' />
                {allRooms.length ? (
                    <Tab value='CURRENT' label='Join room' />
                ) : null}
            </Tabs>
            {roomType === 'NEW' ? (
                <NewRoomForm
                    connect={connect}
                    setRoom={setRoom}
                    setPassword={setPassword}
                />
            ) : (
                <JoinRoomForm
                    connect={connect}
                    setRoom={setRoom}
                    setPassword={setPassword}
                />
            )}
        </Paper>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '2rem 3rem',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '30rem',
        margin: 'auto',
    },
}));
