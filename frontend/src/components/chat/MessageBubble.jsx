import React from "react";

export default function MessageBubble({ senderName, send_at, text, isMine }) {
    const cleanDate = new Date(send_at).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })
    return (
        <div className={`flex flex-col max-w-[70%] ${isMine ? 'self-end items-end' : 'self-start items-start'}`}>

            {!isMine && <span className="text-xs text-text-caption mb-1">{senderName}</span>}

            <div className={`px-4 py-2 rounded-md break-words ${isMine ? 'bg-primary text-surface-white' : 'bg-surface-alt text-text-primary'}`}>
                <p>{text}</p>
                <span className="text-xs opacity-70 block text-right mt-1">{cleanDate}</span>
            </div>

        </div>
    )
}