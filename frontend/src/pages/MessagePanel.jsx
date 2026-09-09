import React from 'react'
import MessageList from '../components/chat/MessageList'
import ChatHeader from '../components/chat/ChatHeader'
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
    const [dogName, setDogName] = useState('');
    const { roomId } = useParams() // reprendre le parametre utilise dans l'url
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    //gerer l'entree qui est mise dans l'input
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loadMessages =  async (roomId) => {
        const response = await fetch(`/api/messages/${roomId}`)
        const data = await response.json();
        setMessages(data)
    }

    const loadDogName = async () => {
        const response = await fetch(`/api/matches/${userId}`);
        const data = await response.json();
        const match = data.find((element) => element.id === roomId);
        if (match){
            const name = match.matchesAsDog1.owner_id === userId ? match.matchesAsDog2.dog_name : match.matchesAsDog1.dog_name; 
            setDogName(name);
        }
    }
    
    useEffect(() => {loadDogName()}, [roomId, userId]);
    

    // useEffect qui s'active des quand rentre/selectionne dans une room
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

    //use effect qui s'active des le debut pour que 
    //la socket soit prete a recevoir des messages 
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

    return(
    <div className="mx-auto mt-10 flex h-150 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <ChatHeader link={() => navigate('/roomlist')} dogName={dogName}/>
        <MessageList messages={messages} userId={userId} />

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
                className="cursor-pointer rounded-xl bg-primary hover:bg-primary-hover px-5 py-3 text-sm font-semibold text-white transition"
            >
                Send
            </button>

        </div>
    </div>

    );
}

