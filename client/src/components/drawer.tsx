import {
  useTheme,
  AppBar,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Drawer,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Toolbar,
  Button,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { Lock } from '@material-ui/icons';
import { ChatContext, Room } from '../contexts/chatContext';
import CreateRoomModal from './modals/createRoomModal';

const drawerWidth = 240;

interface Props {
  setPasswordModal: React.Dispatch<
    React.SetStateAction<{
      room: {
        name: string;
      };
      isOpen: boolean;
    }>
  >;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

export default function ResponsiveDrawer(props: Props) {
  const { handleDrawerToggle, mobileOpen, setPasswordModal } = props;
  const { allRooms, handleLogout, handleJoinRoom, currentRoom } =
    useContext(ChatContext);

  const classes = useStyles();
  const theme = useTheme();

  const handleRoomChange = (room: Room) => {
    if (room.hasPassword) {
      if (room.name === currentRoom) {
        return;
      }
      setPasswordModal({
        room: room,
        isOpen: true,
      });
    } else {
      console.log('no password');
      handleJoinRoom(room);
    }
  };

  const drawer = (
    <div className={classes.drawerContainer}>
      <AppBar color="primary" className={classes.drawerBar} position="relative">
        <Toolbar disableGutters={true} className={classes.drawerInner}>
          <Typography noWrap>Rooms</Typography>
          <CreateRoomModal />
        </Toolbar>
      </AppBar>
      <List>
        {allRooms.map((room, index) => (
          <ListItem selected={room.name === currentRoom} button key={index}>
            <ListItemText
              primary={room.name}
              secondary={room.users?.map((user, i) => {
                if (i + 1 !== room.users?.length && room.users?.length !== 1) {
                  return user + ', ';
                } else {
                  return user;
                }
              })}
              onClick={() => handleRoomChange(room)}
            />
            {room.hasPassword ? <Lock className={classes.lockIcon} /> : null}
          </ListItem>
        ))}
      </List>
      <div className={classes.logoutContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          fullWidth={true}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      zIndex: 10,
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      height: `calc(100% - 4rem)`,
      width: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        top: '4rem',
      },
      [theme.breakpoints.down('xs')]: {
        height: '100%',
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    drawerBar: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
    drawerInner: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoutContainer: {
      flex: 1,
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'flex-end',
    },
    lockIcon: {
      color: 'grey',
    },
  })
);
