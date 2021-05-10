import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { colorTheme } from './styling/colorTheme';
import { ThemeProvider } from '@material-ui/core';
import ChatRoomMain from './components/chatRoomMain';
import ChatProvider from './contexts/chatContext';
import LoginPage from './routes/loginPage';

function App() {
	return (
		<ChatProvider>
			<ThemeProvider theme={colorTheme}>
				<Router>
					<Switch>
						<Route path='/chatroom' component={ChatRoomMain}></Route>
						<Route exact path='/' component={LoginPage}></Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</ChatProvider>
	);
}

export default App;
