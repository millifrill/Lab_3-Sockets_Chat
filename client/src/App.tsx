import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { colorTheme } from './styling/colorTheme';

function App() {
	return (
		<ThemeProvider theme={colorTheme}>
			<Router>
				<Switch>
					<Route></Route>
					<Route></Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
