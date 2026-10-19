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
        .then(res => {
            if (!res.ok) throw new Error()
            return res.json()
        })
        .then(data => setOwner(data))
        .catch(() => {})
    }, [ownerId])

    useEffect(() => {
        authFetch(`/api/user/${ownerId}/pic`)
            .then(res => res.ok ? res.blob() : null)
            .then(blob => { if (blob) setAvatarUrl(URL.createObjectURL(blob)) })
            .catch(() => {})
    }, [ownerId])

    return (
        <div className='bg-surface-raised rounded-[var(--radius-md)] p-5 flex items-center gap-4'>
            <Avatar url={avatarUrl} size='xl' />
            <div className='flex flex-col'>
                <span className='text-xs uppercase tracking-widest text-text-caption'>{t('HisHuman')}</span>
                <span className='font-heading text-xl text-surface-white'>{owner?.first_name}</span>
                <span className='text-sm text-surface-cream'>{owner?.city}</span>
            </div>
        </div>
    )
}