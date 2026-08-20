import React from 'react'

export default function Message({senderName, text})
{   
    return (
        <div classname="message-item">
            <div><b>{senderName}</b></div>
        <span>{text}</span>
        </div>
    )
}