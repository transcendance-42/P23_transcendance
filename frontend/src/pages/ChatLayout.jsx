import { RoomList } from "./Roomlist";
import MessagePanel from "./MessagePanel";
import NavBarAuth from "../components/ui/NavBarAuth";
import { useParams } from 'react-router-dom'
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
            const response = await authFetch(`/api/matches/me`);
            const data = await response.json();
            setRooms(data);
        }
        loadRooms();
        setRoomsLoaded(true)
        const id = setInterval(() => { // rechargement des rooms pour savoir si user online
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