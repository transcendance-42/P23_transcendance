import React from 'react'
import Message from './../components/MessagePanel/Message'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useParams, useNavigate } from 'react-router-dom'


const socket = io('http://localhost:3000')

const initalFormData = {
  content: '',
}

export default function MessagePanel()
{
    const [messages, setMessages] = useState([])
    const [formData, setFormData] = useState(initalFormData)
    const { roomId } = useParams()
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loadMessages =  async (roomId) => {
        const response = await fetch(`/api/messages/${roomId}`)
        const data = await response.json();
        setMessages(data)
    }

    // const loadMatches = 

    useEffect(() => {     
        if (roomId)
        {
            socket.emit('join_room', roomId);           
            loadMessages(roomId);
        }
        return () => {
            socket.emit('leave_room', roomId);
        }
    },[roomId])

    useEffect(()=> {
        const handeleReceiveMessage = (message) => {         
            setMessages((preMessages) => [...preMessages, message])
        }
        socket.on("receive_message", handeleReceiveMessage)

        return () => {
            socket.off("receive_message", handeleReceiveMessage)
        }
    }, [])

    const handleSendMessage = () => {

        const messageData = {
        match_id: roomId,
        sender_id: userId,        
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

        <div className="h-16 shrink-0 border-b border-gray-200 bg-indigo-600">
            le nom du chien mggllll
        </div>
        <div className='flex h-16 shrink-0 items-center border-b border-gray-200 bg-indigo-600 px-4'>
            <button
                onClick={() => {navigate('/roomlist')}}
                className='rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/30'
            >
                Back
            </button>
        </div>

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

