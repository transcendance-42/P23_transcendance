import React from 'react'
import { RoomList  } from './Roomlist'
import './chat-app.scss'
import MessagePanel from './MessagePanel';
import { useEffect, useState } from 'react';

export default function Chat ()
{
    const [rooms, setRooms] = useState([]);
    const [selectRoom, changeRoom] = useState(null);


    const loadRooms = async () => {
        console.log("start the loading of the rooms")
        const response = await fetch('/api/matches');
        const data = await response.json();
        setRooms(data);
        console.log("i want show what i got")
        console.log(data)
    }

    useEffect(() => {
        loadRooms();
    }, [])

    useEffect(() => {
        console.log("ROOMS SELECTED: ");
        console.log(selectRoom);
    }, [selectRoom]);

    useEffect(() => {
        console.log("rooms was updated:");
        console.log(rooms);
    }, [rooms]);

    return (
        <div className="chat-app">
            <RoomList rooms={rooms}
                        handleClickOnRoom={changeRoom}/>
            <MessagePanel channel={selectRoom}/>
        </div>
    );
}