import { CSSProperties } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { useContext, useState } from "react";
import { ChatContext } from "../contexts/chatContext";


export default function LoginPage () {
    const [userSettings, setUserSettings] = useState({
        userName: "",
        room: {
            name: "",
            password: "",
            newRoom: false
        }

    })
    const chatContext = useContext(ChatContext)
    const {allRooms} = chatContext;

    const handleUserNameChange = (value: string) => {
        setUserSettings((prevState) => ({
            ...prevState,
            userName: value
        }))   
    }

    const handleRoomChange = (roomName: string, isNewRoom: boolean, password?: string) => {
            setUserSettings((prevState) => ({
                ...prevState,
                room: {
                    ...prevState.room,
                    name: roomName,
                    newRoom: isNewRoom,
                }
            }))  
    }

    const handlePasswordChange = (password: string) => {
        setUserSettings((prevState) => ({
            ...prevState,
            room: {
                ...prevState.room,
                password: password
            }
        }))
    }


   const createOrJoinRoom = () => {
       const {password, newRoom, name} = userSettings.room;
       const room = {name: name}
       if (newRoom) {
           chatContext.handleCreateRoom(room, password)
        } else {
            chatContext.handleJoinRoom(room, password)
       }
   }

    return (
        <div style={mainContent}>
            <p style={nameStyle}>Chattastic</p> 
                <div style={formBox}>
                <form >
                  <p style={text}>Please enter your name</p>
                    <TextField 
                    style={formStyle}
                    id="outlined-basic" 
                    placeholder="Enter name"
                    onChange={(e) => handleUserNameChange(e.target.value)}
                    variant="outlined"/>
                 <p style={text}>Choose a room to join</p>
                    <TextField 
                    style={formStyle}
                    id="outlined-select"
                    placeholder="Choose room"
                    select
                    variant="outlined"
                    onChange= {(e) => handleRoomChange(e.target.value, false)}
                    />
                <p style={text}>Or</p>
                <p style={text}>Create a new chatroom</p>
                <div style={formBox}>
                <TextField 
                    style={formStyle}
                    id="outlined-basic" 
                    placeholder="Enter name"
                    variant="outlined"
                    onChange={(e) => handleRoomChange(e.target.value, true)}
                />
                 <p style={text}>Enter chatroom password</p>
                <TextField 
                    style={formStyle}
                    id="outlined-basic" 
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                />
                  <button 
                    style={connectButton} onClick={createOrJoinRoom}>Connect</button>
                </div>
                 </form>
             </div>
        </div>

    )
}

const mainContent: CSSProperties = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#DCD9F2",

}   

const nameStyle: CSSProperties = {
    fontSize: "5rem",
    // marginTop: "2rem",
    color: "#7361EF",

 }

const formBox : CSSProperties = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
}


const formStyle: CSSProperties = {
    width: "18rem",
    borderRadius: 9,
    outline: "none",
    marginTop: "0.3rem",
    background: "white",

}

const connectButton: CSSProperties = {
    marginTop: "0.3rem",
    width: "10rem",
    height: "2rem",
    borderRadius: 20,
    border: "none",
    background: "#7361EF",
    color: "white", 
}

const text: CSSProperties = {
    color: "#1CA491",
    textAlign: "center",
    margin: 0,
 
}