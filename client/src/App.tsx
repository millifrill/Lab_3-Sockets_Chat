import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { colorTheme } from './styling/colorTheme';



function App() {
  return (
    <ThemeProvider theme={colorTheme}>
      
    </ThemeProvider>
  );
}

export default App;
