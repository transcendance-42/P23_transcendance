import React from 'react'

export default function Message({senderName, dogName, text})
{   
    return (
        <div className="message-item">
            <div><b>{senderName}</b></div>
        <span>{text}</span>
        </div>
    )
}