import React from 'react'
import { RoomList  } from './Roomlist'
import './chat-app.scss'
import MessagePanel from './MessagePanel';

export default function Chat ()
{
    const state = {
        channels: [{
            id: 1,
            name:'first',
            participants:2
        }]
    }
    return (
        <div className="chat-app">
            <RoomList channels={state.channels}/>
            <MessagePanel/>
        </div>
    );
}