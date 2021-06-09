import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { colorTheme } from './styling/colorTheme';
import { ThemeProvider } from '@material-ui/core';
import ChatRoomMain from './routes/chatRoomMain';
import ChatProvider from './contexts/chatContext';
import LoginPage from './routes/loginPage';
import Main from './components/main';

function App() {
    return (
        <ChatProvider>
            <ThemeProvider theme={colorTheme}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={LoginPage}></Route>
                        <Route path='/chatroom' component={Main}></Route>
                        <Route path='/room' component={ChatRoomMain}></Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </ChatProvider>
    );
}

export default App;
