import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../../api/authFetch'
import Avatar from '../ui/Avatar'

export default function DogOwnerCard({ ownerId }) {
    const { t } = useTranslation()
    const [owner, setOwner] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        authFetch(`/api/users/${ownerId}`)
            .then(res => res.json())
            .then(data => setOwner(data))
    }, [ownerId])

    useEffect(() => {
        authFetch(`/api/user/${ownerId}/pic`)
            .then(res => res.ok ? res.blob() : null)
            .then(blob => { if (blob) setAvatarUrl(URL.createObjectURL(blob)) })
            .catch(() => {})
    }, [ownerId])

    return (
        <div className='bg-surface-raised rounded-[var(--radius-md)] p-5 flex items-center gap-4'>
            <div className='w-16 h-16 rounded-full overflow-hidden bg-surface-cream flex items-center justify-center'>
                <Avatar url={avatarUrl} size='xl' />
            </div>
            <div className='flex flex-col'>
                <span className='text-xs uppercase tracking-widest text-text-caption'>{t('HisHuman')}</span>
                <span className='font-heading text-xl text-surface-white'>{owner?.first_name}</span>
                <span className='text-sm text-surface-cream'>{owner?.city}</span>
            </div>
        </div>
    )
}