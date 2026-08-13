import React from 'react'
import { RoomList  } from './Roomlist'
import './chat-app.scss'
import MessagePanel from './MessagePanel';
import { useEffect, useState } from 'react';

// async function getData() {
//   const url = "https://example.org/products.json";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

export default function Chat ()
{
    const [rooms, setRooms] = useState([
    ]);

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
        console.log("rooms was updated:");
        console.log(rooms);
    }, [rooms]);

    return (
        <div className="chat-app">
            <RoomList rooms={rooms}/>
            <MessagePanel/>
        </div>
    );
}