import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { colorTheme } from './styling/colorTheme';
import { ThemeProvider } from '@material-ui/core';
import ChatProvider from './contexts/chatContext';
import LoginPage from './routes/loginPage';
import MainPage from './routes/mainPage';
import PageNotFound from './components/404';

function App() {
    return (
        <ChatProvider>
            <ThemeProvider theme={colorTheme}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={LoginPage}></Route>
                        <Route path='/chatroom' component={MainPage}></Route>
                        <PageNotFound />
                    </Switch>
                </Router>
            </ThemeProvider>
        </ChatProvider>
    );
}

export default App;
