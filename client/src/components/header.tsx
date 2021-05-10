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
			<img className={styled.image} src={image} alt='chat-pic' />
			<h4 className={styled.title}>Chattastic</h4>
			<p className={styled.userName}>{userName}</p>
			<Hidden smUp>
				<Menu onClick={handleClick} />
			</Hidden>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	header: {
		boxSizing: 'border-box',
		padding: '10px',
		height: '5rem',
		background: 'white',
		color: '#897AF2',
		border: '1px solid #F6F6F6',
		display: 'flex',
	},

	title: {
		textAlign: 'left',
		marginLeft: '2rem',
		fontSize: '1.3rem',
	},

	image: {
		height: '100%',
		marginLeft: '1.5rem',
	},

	userName: {
		position: 'absolute',
		left: '95%',
		fontSize: '1vw',
		paddingTop: '1rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
			paddingTop: '1rem',
			left: '90%',
		},
	},
}));
