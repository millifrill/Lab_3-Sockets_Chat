import { makeStyles, styled, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import UserProvider from '../contexts/userContext';
import { colorTheme } from '../styling/colorTheme';




function ChatRoom() {
    const style = useStyles();
    const [NewMessage, setNewMessage] = useState("")



    const handleNewMessageChange = (event: any) => {
        setNewMessage(event.target.value);
    };

    const sendMessages = () => {
        console.log("button")
    }


    return (
        <UserProvider>
            <ThemeProvider theme={colorTheme}>
                <div className={style.div}>
                    <textarea
                        placeholder="Your message....."
                        className={"User specific message"}
                        value={NewMessage}
                        onChange={handleNewMessageChange}
                    />
                    <button onClick={sendMessages}>Send</button>
                </div>

            </ThemeProvider>
        </UserProvider >

    );

}

const useStyles = makeStyles({
    div: {
        border: '1px solid black',
        position: 'absolute',

    },
});





export default ChatRoom;




