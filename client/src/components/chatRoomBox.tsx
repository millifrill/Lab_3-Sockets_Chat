import { createMuiTheme } from "@material-ui/core";
import { makeStyles, styled, ThemeProvider } from "@material-ui/styles";
import { useState } from "react";
import UserProvider from "../contexts/userContext";
import { colorTheme } from "../styling/colorTheme";

export default function ChatRoomBox() {
    const styled = useStyles();
    const [NewMessage, setNewMessage] = useState("")

    const handleNewMessageChange = (event: any) => {
        setNewMessage(event.target.value);
    };

    const sendMessages = () => {
        console.log("button")
    }

    // logiken för bubblorna och meddelandet 

    return (
        <UserProvider>
            <ThemeProvider theme={colorTheme}>
                <div className={styled.chatContainer}>
                    <ol>
                        <dt></dt>
                    </ol>
                    <textarea
                        className={styled.textarea}
                        placeholder="Write a message....."
                        value={NewMessage}
                        onChange={handleNewMessageChange}
                    />
                    <button className={styled.buttonSend} onClick={sendMessages}>
                        Send
                        </button>



                </div>
            </ThemeProvider>
        </UserProvider>
    )
}


const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

const useStyles = makeStyles(theme => ({

    chatContainer: {
        border: '1px solid #DCD9F2',
        margin: 'auto',
        width: '78%',
        height: '43em',
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',

    },

    textarea: {
        position: 'absolute',
        bottom: '0',
        background: '#F6F6F6',
        width: '99.5%',
        height: '5rem',
        textDecoration: 'none',
        border: 'none',
        outline: 'none',
    },
    buttonSend: {
        position: 'absolute',
        bottom: '0',
        right: '0'
    },

}))