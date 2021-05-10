import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { IconButton } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ChatContext, Room } from '../contexts/chatContext';

interface Props {
	setPasswordModal: React.Dispatch<
		React.SetStateAction<{
			room: Room;
			isOpen: boolean;
		}>
	>;
	passwordModal: {
		room: Room;
		isOpen: boolean;
	};
}

export default function PasswordModal(props: Props) {
	const { setPasswordModal, passwordModal } = props;
	const [password, setPassword] = useState('');
	const chatContext = useContext(ChatContext);
	const { handleJoinRoom, currentRoom, errors } = chatContext;
	const styled = useStyles();
	//   const logoImg = `../assets/logo.png`;
	/* const [open, setOpen] = React.useState(false); */
	/* const handleClickOpen = () => {
    setOpen(true);
  }; */

	// If user has been assigned a room, close password modal
	useEffect(() => {
		if (!errors.wrongPassword) {
			setPasswordModal((prevState) => ({
				...prevState,
				isOpen: false,
			}));
		}
	}, [currentRoom, setPasswordModal, errors.wrongPassword]);

	const handleClose = () => {
		setPasswordModal((prevState) => ({
			...prevState,
			isOpen: false,
		}));
	};

	const handlePasswordChange = (password: string) => {
		setPassword(password);
	};

	const handleRoomChange = () => {
		handleJoinRoom(passwordModal.room, password);
	};

	return (
		<div>
			<Dialog
				open={passwordModal.isOpen}
				/* onClose={handleClose} */
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'></DialogTitle>
				{/* <img src={logoImg} alt="" className={imgStyle}/> */}

				<DialogContent>
					<DialogContentText className={styled.modalTitle}>
						Please enter the password
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='password'
						label='Password'
						type='password'
						onChange={(e) => handlePasswordChange(e.target.value)}
						placeholder='Enter password'
						fullWidth
					/>
					<p className={styled.errorMessage}>
						{errors.wrongPassword ? 'Incorrect password' : null}
					</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button
						onClick={handleRoomChange}
						color='secondary'
						variant='contained'
					>
						Enter room
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
		errorMessage: {
			color: 'red',
		},
		modalTitle: {
			color: 'black',
			fontSize: '1.2rem',
			fontWeight: 'bold',
		},
	}),
);
