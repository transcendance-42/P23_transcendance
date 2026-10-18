import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../../api/authFetch'
import PrimaryButton from '../ui/PrimaryButton'

export default function SendMessageButton({ dogId }) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState(null)

    useEffect(() => {
        authFetch(`/api/matches/me`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) return
                const room = data.find(m =>
                    String(m.matchesAsDog1.id) === String(dogId) ||
                    String(m.matchesAsDog2.id) === String(dogId)
                )
                if (room) setRoomId(room.id)
            })
            .catch(() => {})
    }, [dogId])

    if (!roomId) return null

    return (
        <PrimaryButton onClick={() => navigate(`/chat/${roomId}`)}>
            <span className='font-heading'>{t('SendMessage')}</span>
        </PrimaryButton>
    )
}