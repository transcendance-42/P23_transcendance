import MessageList from '../components/chat/MessageList'
import ChatHeader from '../components/chat/ChatHeader'
import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import { authFetch } from '../api/authFetch'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import { apiRefresh } from '../api/auth'

const initalFormData = {
  content: '',
}

export default function MessagePanel()
{
    const { token } = useAuth()
    const { t } = useTranslation()
    const [messages, setMessages] = useState([])
    const [formData, setFormData] = useState(initalFormData)
    const [dogName, setDogName] = useState('');
    const { roomId } = useParams() // reprendre le parametre utilise dans l'url
    const { userId } = useAuth()
    const navigate = useNavigate()
    const socketRef = useRef(null)

    //gerer l'entree qui est mise dans l'input
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loadMessages =  async (roomId) => {
        const response = await authFetch(`/api/messages/${roomId}`)
        const data = await response.json();
        setMessages(data)
    }

    const loadDogName = async () => {
        const response = await authFetch(`/api/matches/me`);
        const data = await response.json();
        const match = data.find((element) => element.id === roomId);
        if (match){
            const name = match.matchesAsDog1.owner_id === userId ? match.matchesAsDog2.dog_name : match.matchesAsDog1.dog_name; 
            setDogName(name);
        }
    }
    
    useEffect(() => {
        loadDogName()
    }, [roomId, userId]);
    
    //use effect qui s'active des le debut pour que 
    //la socket soit prete a recevoir des messages 
    useEffect(()=> {
        if (!token)
            return
        const socket = io('http://localhost:3000', {
            auth: {token:token}
        })
        socketRef.current = socket

        const handeleReceiveMessage = (message) => {         
            setMessages((preMessages) => [...preMessages, message])
        }

        // implemenatation du connect error pas fini
        socket.on('connect_error', () =>{
        apiRefresh()
        const socket = io('http://localhost:3000', {
        auth: {token:token}
        })
        socketRef.current = socket
        }
        )    
        socket.on("receive_message", handeleReceiveMessage)


        return () => {
            socket.off("receive_message", handeleReceiveMessage)
            socket.disconnect()
            socketRef.current = null
        }
    }, [token])

    // useEffect qui s'active des quand rentre/selectionne dans une room
    useEffect(() => {   
        const socket = socketRef.current 
        if (!socket || !roomId )
            return

        socket.emit('join_room', roomId);           
        loadMessages(roomId);

        return () => {
            socket.emit('leave_room', roomId);
        }
    },[roomId])


    const handleSendMessage = () => {

        const socket = socketRef.current
        if (!socket)
            return
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
    <div className="flex flex-1 flex-col min-h-0 bg-white">
        <ChatHeader link={() => navigate('/chat')} dogName={dogName}/>
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
                {t('Send')}
            </button>

        </div>
    </div>

    );
}

