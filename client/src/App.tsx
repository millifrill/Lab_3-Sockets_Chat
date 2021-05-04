import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { colorTheme } from './styling/colorTheme';
import { ThemeProvider } from '@material-ui/core';
import UserProvider from './contexts/userContext';

function App() {
	return (
		<UserProvider>
			<ThemeProvider theme={colorTheme}>
				<Router>
					<Switch>
						<Route></Route>
						<Route></Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</UserProvider>
	);
}

export default App;
