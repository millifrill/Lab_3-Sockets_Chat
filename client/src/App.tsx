import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="chatroom" element={<MainPage />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ChatProvider>
  );
}

export default App;
