import './App.css';
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const socket = io.connect("http://localhost:3001")

function CreateRoom() {
    const [roomname, setRoomName] = useState("");
    const [roomcode, setRoomCode] = useState("");
    const [showmain, setShowmain] = useState(false);
    const [status, setstatus] = useState("");
    const [createrName,setCreaterName]=useState("");
    const create_Room = () => {
        if (roomname !== "" && roomcode !== "") {
            socket.emit("createroom", {createrName, roomname, roomcode });
        }
    };
    useEffect(() => {
        socket.on("checksameroom", (data) => {
            setstatus(data)
            console.log(data)
            return (
                <>
                    <p>
                        {(data === "Room already exists") ? (
                            console.log(data)
                        ) : (setShowmain(true))}
                    </p>
                </>
            );
        })
    }, [socket]);
    return (
        <div>
            <div className="App">
                    <div className="joinChatContainer">
                        <h3>Join A Chat</h3>
                        <input
                            type="text"
                            placeholder="Roomname"
                            onChange={(event) => {
                                setRoomName(event.target.value);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Room Password"
                            onChange={(event) => {
                                setRoomCode(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Creater name"
                            onChange={(event) => {
                                setCreaterName(event.target.value);
                            }}
                        />
                        <button onClick={create_Room}>Create A Room</button>
                        <p>{status}</p>
                    </div>
            </div>
        </div>
    );

}

export default CreateRoom;