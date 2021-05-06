import { CSSProperties } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { useContext } from 'react';
import { ChatContext } from '../contexts/chatContext';

export default function LoginPage() {
	const context = useContext(ChatContext);
	const handleLogin = (name: string) => {
		context.handleSetUsername(name);
	};
	return (
		<div style={mainStyle}>
			<p style={logo}>Chattastic</p>
			<div style={loginBox}>
				<form style={loginBox}>
					<p style={text}>Please enter your name</p>
					<TextField
						style={formStyle}
						id='outlined-basic'
						label='Enter name'
						variant='outlined'
					/>
					<p style={text}>Choose a room to join</p>
					<TextField
						style={formStyle}
						id='outlined-select'
						select
						label='Välj rum'
						variant='outlined'
					/>
				</form>
				<button style={connectButton} onClick={() => handleLogin('')}>
					Connect
				</button>
			</div>
		</div>
	);
}

const mainStyle: CSSProperties = {
	height: '100vh',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	backgroundColor: '#DCD9F2',
};

const logo: CSSProperties = {
	fontSize: '5rem',
	marginTop: '-2rem',
	color: '#7361EF',
};
const loginBox: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
};

const formStyle: CSSProperties = {
	width: '18rem',
	borderRadius: 9,
	outline: 'none',
	marginTop: '0.3rem',
	background: 'white',
};

const connectButton: CSSProperties = {
	marginTop: '0.3rem',
	width: '8rem',
	height: '2rem',
	borderRadius: 20,
	border: 'none',
	background: '#7361EF',
	color: 'white',
	fontWeight: 400,
};

const text: CSSProperties = {
	color: '#1CA491',
};
