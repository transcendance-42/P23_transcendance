import { RoomList } from "./Roomlist";
import MessagePanel from "./MessagePanel";
import NavBarAuth from "../components/ui/NavBarAuth";
import { replace, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Mascot from '../components/ui/Mascot'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { authFetch } from "../api/authFetch";

export default function ChatLayout(){
    const { t } = useTranslation()
    const { roomId } = useParams()
    const [rooms, setRooms] = useState([])
    const [roomsLoaded, setRoomsLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const response = await authFetch(`/api/matches/me`)
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                const data = await response.json()
                if (!Array.isArray(data)) return

                const sorted = [...data].sort((a, b) => {
                    const aTime = new Date(a.messages?.[0]?.send_at ?? a.created_at)
                    const bTime = new Date(b.messages?.[0]?.send_at ?? b.created_at)
                    return bTime - aTime
                })
                setRooms(sorted)
            } catch (e) {
                //
            }
        }
        loadRooms();
        setRoomsLoaded(true)
        const id = setInterval(() => {
            if (document.visibilityState === 'visible')
                loadRooms()
        }, 30_000)
        return () => clearInterval(id)
     }, [])

    const roomExist = rooms.some(r => String(r.id) === roomId)

    useEffect(() => {
        if (roomId && rooms.length > 0 && !roomExist )
            navigate('/chat', {replace: true})

    }, [rooms, roomsLoaded, roomId, navigate])


    return (
        <div className="flex flex-col h-screen">
            <NavBarAuth/>
            <div className="flex flex-1 min-h-0">
                <div className={`${roomId ? 'hidden' : 'flex'} md:flex w-full md:w-80 shrink-0`}>
                     <RoomList rooms={rooms} setRooms={setRooms} />
                </div>
                <div className={`${roomId ? 'flex' : 'hidden'} md:flex flex-1 min-h-0`}>
                    {roomId && roomExist ? <MessagePanel rooms={rooms} /> : 
                    <div className="flex flex-1 flex-col justify-center items-center gap-4 bg-surface-cream">
                        <Mascot index={3} size="lg" />
                        <p className="text-text-caption text-sm">{t('SelectChat')}</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}