import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { colorTheme } from "./styling/colorTheme";
import { ThemeProvider } from "@material-ui/core";
import ChatProvider from "./contexts/chatContext";

function App() {
  return (
    <ChatProvider>
      <ThemeProvider theme={colorTheme}>
        <Router>
          <Switch>
            <Route></Route>
            <Route></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ChatProvider>
  );
}

export default App;
