import { CSSProperties } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useState } from "react";
import { ChatContext } from "../contexts/chatContext";
import MenuItem from '@material-ui/core/MenuItem';


export default function LoginPage () {
    const logoImg = `../assets/logo.png`
    const chatContext = useContext(ChatContext)
    const {allRooms, handleCreateRoom, handleJoinRoom, handleSetUsername} = chatContext;
    const [userSettings, setUserSettings] = useState({
        userName: "",
        room: {
            name: "",
            password: "",
            isNewRoom: false
        }
    })

    const handleUserNameChange = (value: string) => {
        setUserSettings((prevState) => ({
            ...prevState,
            userName: value
        }))   
    }

    const handleRoomChange = (roomName: string, isNewRoom: boolean) => {
            setUserSettings((prevState) => ({
                ...prevState,
                room: {
                    ...prevState.room,
                    name: roomName,
                    isNewRoom: isNewRoom,
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

   const connect = () => {
       const {userName} = userSettings;
       const {password, isNewRoom, name} = userSettings.room;
       const room = {name: name}
       handleSetUsername(userName)
       if (isNewRoom) {
           handleCreateRoom(room, password)
        } else {
            handleJoinRoom(room, password)
       }
   }

    return (
        <div style={mainContent}>
            <p style={nameStyle}>Chattastic</p> 
         <img src={logoImg} alt="" style={imgStyle}/>
                <div style={formBox}>
                <div >
                  <p style={text}>Please enter your name</p>
                    <TextField 
                    style={formStyle}
                    id="outlined-basic" 
                    placeholder="Enter name"
                    onChange={(e) => handleUserNameChange(e.target.value)}
                    variant="outlined"/>
                    {allRooms.length ? 
                    <>
                 <p style={text}>Choose a room to join</p>
                 <TextField 
                 style={formStyle}
                 id="outlined-select"
                 placeholder="Choose room"
                 select
                 variant="outlined"
                 onChange= {(e) => handleRoomChange(e.target.value, false)}
                 >
                    {allRooms.map((room) => (
                        <MenuItem key={room.name} value={room.name}>
                        {room.name}
                        </MenuItem>
                    ))}
                    </TextField>
                <p style={text}>Or</p>
                </>
            : null}
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
                    style={connectButton} onClick={connect}>Connect</button>
                </div>
                 </div>
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

const imgStyle: CSSProperties = {
    width: "10rem",
    position: "relative",
    marginTop: "-5rem",
}

const nameStyle: CSSProperties = {
    fontSize: "5rem",
    marginTop: "-2rem",
    color: "#7361EF",
    width: "100%",
    heigth: "100%",
    textAlign: "center",

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
    marginTop: "0.5rem",
    height: "3rem",
    borderRadius: 20,
    border: "none",
    background: "#7361EF",
    color: "white", 
    fontSize: "1rem",
    fontWeight: 600,
}

const text: CSSProperties = {
    color: "#1CA491",
    textAlign: "center",
    margin: "0.5rem",
    fontWeight: 600,
 
}

