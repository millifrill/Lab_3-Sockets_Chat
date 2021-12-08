import {
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import RoomHeader from '../components/roomHeader';
import MessageInput from '../components/messageInput';
import ResponsiveDrawer from '../components/drawer';
import SiteHeader from '../components/siteHeader';
import { MessagesContainer } from '../components/messagesContainer';
import { ChatContext } from '../contexts/chatContext';
import { useNavigate } from 'react-router';
import PasswordModal from '../components/modals/passwordModal';

const drawerWidth = 240;

export default function MainPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState({
    room: {
      name: '',
    },
    isOpen: false,
  });
  const { userName } = useContext(ChatContext);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!userName) {
      navigate('/');
    }
  }, [userName, navigate]);

  return (
    <>
      {passwordModal && (
        <PasswordModal
          setPasswordModal={setPasswordModal}
          passwordModal={passwordModal}
        />
      )}
      <SiteHeader handleDrawerToggle={handleDrawerToggle} />
      <CssBaseline />
      <ResponsiveDrawer
        setPasswordModal={setPasswordModal}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <main className={classes.main}>
        <RoomHeader />
        <div className={classes.toolbar} />
        <div className={classes.toolbar} />
        <MessagesContainer />
        <MessageInput />
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
