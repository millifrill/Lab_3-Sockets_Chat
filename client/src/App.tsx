import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { colorTheme } from "./styling/colorTheme";
import UserProvider from "./contexts/userContext";

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={colorTheme}></ThemeProvider>
    </UserProvider>
  );
}

export default App;
