import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import logo from '../chat-icon.png';

export default function PageNotFound() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.main}>
            <img src={logo} alt='Chattastic logo'></img>
            <h1>404</h1>
            <h2>Sorry, page not found</h2>
            <Button
                variant='contained'
                color='primary'
                onClick={() => history.goBack()}
            >
                Go back
            </Button>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& h1': {
            margin: '0.5rem 0 0.15rem 0',
            fontSize: '4rem',
            color: theme.palette.primary.main,
        },
        '& h2': {
            margin: '0.25rem 0 2.5rem 0',
            fontWeight: 600,
            color: 'grey',
            fontSize: '1.2rem',
        },
        '& img': {
            width: '5rem',
        },
    },
}));
