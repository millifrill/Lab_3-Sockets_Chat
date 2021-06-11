import image from '../chat-icon.png';
import {
    AppBar,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
    handleDrawerToggle: () => void;
}

export default function SiteHeader(props: Props) {
    const classes = useStyles();
    const { handleDrawerToggle } = props;

    return (
        <AppBar color='inherit' position='fixed' className={classes.appBar}>
            <Toolbar className={classes.headerInner}>
                <div style={{ flex: 1 }}>
                    <img src={image} alt='Chat' className={classes.image}></img>
                    <Typography noWrap color='primary'>
                        Chattastic
                    </Typography>
                </div>
                <IconButton
                    color='primary'
                    aria-label='open drawer'
                    edge='start'
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: 100,
            [theme.breakpoints.up('sm')]: {
                width: '100%',
            },
        },
        menuButton: {
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        image: {
            width: '2rem',
            marginRight: '1rem',
        },
        headerInner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& div': {
                display: 'flex',
                alignItems: 'center',
                '& p': {
                    fontSize: '1.2rem',
                    fontWeight: 600,
                },
            },
        },
    })
);
