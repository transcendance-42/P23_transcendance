import MessageList from '../components/chat/MessageList'
import ChatHeader from '../components/chat/ChatHeader'
import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import { authFetch } from '../api/authFetch'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import { apiRefresh } from '../api/auth'
import Mascot from '../components/ui/Mascot'

const initalFormData = {
  content: '',
}

export default function MessagePanel({rooms})
{
    const { token } = useAuth()
    const { t } = useTranslation()
    const [messages, setMessages] = useState([])
    const [formData, setFormData] = useState(initalFormData)
    const { roomId } = useParams()
    const { userId, logout } = useAuth()
    const navigate = useNavigate()
    const socketRef = useRef(null)
    const [error, setError] = useState(null)

    const match = rooms.find((element) => String(element.id) === String(roomId))

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loadMessages = async (roomId) => {
        try {
            const response = await authFetch(`/api/messages/${roomId}`)
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const data = await response.json()
            setMessages(Array.isArray(data) ? data : data.messages || [])
            setError(null)
        } catch (e) {
            setError(t('ErrorLoadingMessages'))
        }
    }
    
    //use effect qui s'active des le debut pour que 
    //la socket soit prete a recevoir des messages 
    useEffect(()=> {
        if (!token)
            return
        const socket = io({
            auth: {token:token}
        })
        socketRef.current = socket

        const handeleReceiveMessage = (message) => {
            if (message.match_id === roomId)        
                setMessages((preMessages) => [...preMessages, message])
        }

        socket.on('connect_error', async () => {
            try {
                const { token: newToken } = await apiRefresh()
                socket.auth.token = newToken
                socket.connect()
            } catch (e) {
                setError(t('ErrorConnection'))
                logout()
                socket.disconnect()
                socketRef.current = null
                navigate('/login')
            }
        })
        socket.on("receive_message", handeleReceiveMessage)

        return () => {
            socket.off("receive_message", handeleReceiveMessage)
            socket.off('connect_error')
            socket.disconnect()
            socketRef.current = null
        }
    }, [token])

    // useEffect qui s'active des quand rentre/selectionne dans une room
    useEffect(() => {   
        const socket = socketRef.current 
        if (!socket || !roomId)
            return

        socket.emit('join_room', roomId)
        loadMessages(roomId)
        authFetch(`/api/messages/${roomId}/read`, { method: 'PATCH' })  // ← ajoute cette ligne

        return () => {
            socket.emit('leave_room', roomId)
        }
    }, [roomId, token])


    const handleSendMessage = () => {
        if (!formData.content.trim())
            return
        const socket = socketRef.current
        if (!socket)
            return
        const messageData = {
        match_id: roomId,      
        content: formData.content
        }

        socket.emit('send_message', messageData)
        // Clear content input
        setFormData((prev) => ({ ...prev, content: '' }))
    }

    if (!match)
        return null
    const dogName = match.matchesAsDog1.owner_id === userId ? match.matchesAsDog2.dog_name : match.matchesAsDog1.dog_name;   

    return(
        <div className="flex flex-1 flex-col min-h-0 bg-surface-cream">
            <ChatHeader link={() => navigate('/chat')} dogName={dogName} />
            {error ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-text-caption">
                    <Mascot index={2} size="md" />
                    <p className="text-sm">{error}</p>
                    <button
                        onClick={() => loadMessages(roomId)}
                        className="text-sm text-primary underline"
                    >
                        {t('Retry')}
                    </button>
                </div>
            ) : (
                <MessageList messages={messages} userId={userId} />
            )}
        <div className="flex items-center gap-2 border-t border-surface-alt bg-surface-cream p-4">
        <input
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage() }}
            name="content"
            placeholder="Message..."
            value={formData.content}
            onChange={handleChange}
            type="text"
            className="flex-1 rounded-xl border border-text-tertiary bg-surface-alt px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-caption focus:border-primary"
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

