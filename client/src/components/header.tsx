import image from '../chat-icon.png';
import { Hidden, makeStyles } from '@material-ui/core';
import { ChatContext } from '../contexts/chatContext';
import { Menu } from '@material-ui/icons';
import React, { useContext } from 'react';

interface Props {
	setMobileRoomList: React.Dispatch<React.SetStateAction<boolean>>;
	mobileRoomList: boolean;
}

export default function Header(props: Props) {
	const styled = useStyles();
	const chatContext = useContext(ChatContext);
	const { userName } = chatContext;
	const { setMobileRoomList, mobileRoomList } = props;

	const handleClick = () => {
		setMobileRoomList(!mobileRoomList);
	};

	return (
		<div className={styled.header}>
			<div className={styled.flexRow}>
			<img className={styled.image} src={image} alt='chat-pic' />
				<Hidden xsDown>
					<h1 className={styled.title}>Chattastic</h1>
				</Hidden>
			</div>
			<div className={styled.flexRow}>
				<p className={styled.userName}>{userName}</p>
				<Hidden mdUp>
				<Menu className={styled.hamburger} onClick={handleClick} />
				</Hidden>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	header: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0.5rem 1.5rem',
		height: '5rem',
		width: '100%',
		background: 'white',
		borderBottom: "1px solid #DCD9F2",
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		color: '#897AF2',
		textAlign: 'left',
		fontSize: '1.3rem',
		marginRight: '1rem',
		fontWeight: 600,
	},
	image: {
		width: '3rem',
		marginRight: '1rem',
	},
	userName: {
		fontWeight: 500,
		fontSize: '1rem',
		marginRight: '1rem',
	},
	hamburger: {
		fontSize: '1.8rem',
		color: '#897AF2',
		marginRight: '1rem',
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
	},
}));
