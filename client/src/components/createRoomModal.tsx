import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default function CreateRoomModal() {
	//   const logoImg = `../assets/logo.png`;
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Icon
				className={classes.root}
				color='primary'
				fontSize='small'
				onClick={handleClickOpen}
			>
				add_circle
			</Icon>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'></DialogTitle>
				{/* <img src={logoImg} alt="" className={imgStyle}/> */}

				<DialogContent>
					<DialogContentText>Create a new chat room</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='chatroom'
						label='Chatroom'
						type='chatroom'
						fullWidth
					/>
					<DialogContentText>
						Enter chat roompassword (optional)
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='password'
						label='Password'
						type='password'
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleClose} color='primary'>
						Create room
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
	}),
);
