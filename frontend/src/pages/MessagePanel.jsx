import React from 'react'
import Message from './Message'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

const initalFormData = {
  match_id: 1,
  sender_id: 1,  
  userName: 'boloss',
  content: '',
}

export default function MessagePanel({channel})
{
    const [messages, setMessages] = useState([])
    const [formData, setFormData] = useState(initalFormData)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loadMessages =  async (id) => {
        console.log("start the loading the messages")
        const response = await fetch(`/api/messages/${id}`)
        const data = await response.json();
        setMessages(data)
        console.log("i want show what i got for m")
        console.log(data);
    }

    useEffect(() => {
        if (channel && channel.id)
        {
            console.log(`on devrait load les messages de ${channel.id}`)            
            loadMessages(channel.id);
        }
    },[channel])

    // useEffect(() => {
    // if (channel && channel.id)
    // {
    //     console.log(`on devrait load les messages de ${channel.id}`)            
    //     loadMessages(channel.id);
    // }
    // },[messages])

    socket.on('receive_message', (message) => {
        console.log("on show le message envoyé et rerecu ducoup")
        console.log(message)
        setMessages((prev) => [...prev, message])
    } )

    const handleSendMessage = () => {

        const messageData = {
        match_id: channel.id,
        sender_id: formData.sender_id,        
        content: formData.content,
        // send_at: new Date().toISOString(),
        // status: 'sent',
        // type: 'text',
        }
        socket.emit('send_message', messageData)

        // setMessages((prevMessages) => [...prevMessages, messageData])

        // Clear content input
        setFormData((prev) => ({ ...prev, content: '' }))
    }    


    let list = "There is no content to display"
    if (messages)
    {
        list = messages.map (m =>
            <Message
            key={m.id}
            id={m.id}
            senderName={m.users.first_name}
            text={m.content}
            />
        )
    }
    return(
        <div>
            <div className='content-panel'></div>
                <div className='messages-list'>
                    {list}
                </div>
            <div className='content-input'>
                <input
                    name='content'
                    placeholder='Message...'
                    value={formData.content}
                    onChange={handleChange}
                    type="text"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

