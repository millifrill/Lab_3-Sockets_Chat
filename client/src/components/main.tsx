import {
    createStyles,
    CssBaseline,
    makeStyles,
    Theme,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import MenuBar from './roomHeader';
import ChatRoomBox from './chatRoomBox';
import ResponsiveDrawer from './drawer';
import Header from './header';
import { MessagesContainer } from './messagesContainer';
import { ChatContext } from '../contexts/chatContext';
import { useHistory } from 'react-router';
import PasswordModal from './passwordModal';

const drawerWidth = 240;

export default function Main() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [passwordModal, setPasswordModal] = useState({
        room: {
            name: '',
        },
        isOpen: false,
    });
    const { userName } = useContext(ChatContext);
    const history = useHistory();
    const classes = useStyles();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        if (!userName) {
            history.push('/');
        }
    }, [userName, history]);

    return (
        <>
            {passwordModal && (
                <PasswordModal
                    setPasswordModal={setPasswordModal}
                    passwordModal={passwordModal}
                />
            )}
            <Header handleDrawerToggle={handleDrawerToggle} />
            <CssBaseline />
            <ResponsiveDrawer
                setPasswordModal={setPasswordModal}
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            />
            <main className={classes.main}>
                <MenuBar />
                <div className={classes.toolbar} />
                <div className={classes.toolbar} />
                <MessagesContainer />
                <ChatRoomBox />
            </main>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        main: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
    })
);
