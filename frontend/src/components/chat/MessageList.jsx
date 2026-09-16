import React from "react";
import MessageBubble from "./MessageBubble";
import { useRef } from "react";
import { useEffect } from "react";

export default function MessageList({messages, userId}){
    const bottomRef = useRef(null);
    useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}, [messages])
    if (messages.length === 0){
        return (
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-5 text-text-caption">
                Soyez le premier à lancer la conversation...
            </div>
        )
    }
    return (
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-gray-50 p-5">
            
                    {messages.map (m =>
                        <MessageBubble
                        key={m.id}
                        senderName={m.users.first_name}
                        send_at= {m.send_at}
                        text={m.content}
                        isMine={m.sender_id === userId}
                        />
                    )}
                    <div ref={bottomRef} />
        </div>
    )
}