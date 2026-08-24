import React from 'react'
import Message from './../components/MessagePanel/Message'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'


const socket = io('http://localhost:3000')

const initalFormData = {
  match_id: 1,
  sender_id: 1,  
  content: '',
}

export default function MessagePanel()
{
    const [messages, setMessages] = useState([])
    const [formData, setFormData] = useState(initalFormData)

    const { id } = useParams()

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
        // if (channel && channel.id)
        // {
            console.log(`on devrait load les messages de ${id}` )            
            loadMessages(id);
        // }
    },[])

    useEffect(()=> {
        const handeleReceiveMessage = (message) => {
            console.log("on show le message envoyé et rerecu ducoup")
            console.log(message)            
            setMessages((preMessages) => [...preMessages, message])
        }
        socket.on("receive_message", handeleReceiveMessage)

        return () => {
            socket.off("receive_message", handeleReceiveMessage)
        }
    }, [])

    const handleSendMessage = () => {

        const messageData = {
        match_id: id,
        sender_id: formData.sender_id,        
        content: formData.content,
        // type: 'text',
        }
        socket.emit('send_message', messageData)
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
    <div className="mx-auto mt-10 flex h-150 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

        <div className="h-16 shrink-0 border-b border-gray-200 bg-indigo-600"></div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-gray-50 p-5">
            {list}
        </div>

        <div className="flex items-center gap-2 border-t border-gray-200 bg-white p-4">

            <input
                name="content"
                placeholder="Message..."
                value={formData.content}
                onChange={handleChange}
                type="text"
                className="flex-1 rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

            <button
                onClick={handleSendMessage}
                className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
                Send
            </button>

        </div>
    </div>

    );
}

