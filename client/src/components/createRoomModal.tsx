import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddCircle } from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default function CreateRoomModal() {
	const logoImg = `../assets/logo.png`;
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
				<AddCircle />
			</Icon>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title' className={classes.modalTitle}>
					Create a new chat room
				</DialogTitle>
				<img src={logoImg} alt='' className={classes.imgStyle} />
				<DialogContent>
					{/* <DialogContentText>Enter name of chat room </DialogContentText> */}
					<TextField
						autoFocus
						margin='dense'
						id='chatroom'
						label='Enter name of chat room'
						type='chatroom'
						fullWidth
					/>
					{/* <DialogContentText>
						Enter chat room password (optional)
					</DialogContentText> */}
					<TextField
						autoFocus
						margin='dense'
						id='password'
						label='Enter chat room password'
						type='password'
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button
						className={classes.buttonStyle}
						variant='outlined'
						onClick={handleClose}
						color='primary'
					>
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
		imgStyle: {
			width: '5rem',
			alignSelf: 'center',
		},
		modalTitle: {
			color: 'black',
			fontSize: '1.2rem',
			fontWeight: 800,
		},
		buttonStyle: {
			height: '2rem',
			width: '9rem',
			borderRadius: 10,
			border: 'none',
			background: '#7361EF',
			color: 'white',
			fontSize: '0.8rem',
			fontWeight: 600,
		},
	}),
);
