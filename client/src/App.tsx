import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { colorTheme } from './styling/colorTheme';
import { ThemeProvider } from '@material-ui/core';
import UserProvider from './contexts/userContext';
import ChatRoom from './components/chatRoom';

function App() {

	// connect  socket.io here in useEffect()
	return (
		<UserProvider>
			<ThemeProvider theme={colorTheme}>
				<Router>
					<Switch>
						<Route path="/" component={ChatRoom}></Route>
						<Route></Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</UserProvider>
	);
}

export default App;
