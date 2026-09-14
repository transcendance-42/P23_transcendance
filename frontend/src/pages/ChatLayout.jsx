import React from "react";
import { RoomList } from "./Roomlist";
import MessagePanel from "./MessagePanel";
import NavBarAuth from "../components/ui/NavBarAuth";
import { useParams } from 'react-router-dom'

export default function ChatLayout(){
    const { roomId } = useParams()
    return (
        <div className="flex flex-col h-screen">
            <NavBarAuth/>
            <div className="flex flex-1 min-h-0">
                <div className={`${roomId ? 'hidden' : 'flex'} md:flex w-full md:w-80 shrink-0`}>
                     <RoomList/>
                </div>
                <div className={`${roomId ? 'flex' : 'hidden'} md:flex flex-1 min-h-0`}>
                    {roomId ? <MessagePanel/> : 
                    <div className="flex flex-1 justify-center items-center">
                       <p>sélectionne une conversation</p> 
                    </div>}
                </div>
            </div>
        </div>
    )
}