import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../api/authFetch'
import NavBarAuth from '../components/ui/NavBarAuth'
import UserSection from '../components/users/UserSection'
import DeactivateModal from '../components/users/DeactivateModal'
import ReactivateModal from '../components/users/ReactivateModal'

export default function UsersLayout() {
    const { t } = useTranslation()
    const [users, setUsers] = useState([])
    const [userToDelete, setUserToDelete] = useState(null)
    const [userToReactivate, setUserToReactivate] = useState(null)
    const [avatarUrls, setAvatarUrls] = useState({})

    const activeUsers = users.filter(u => u.is_active !== false)
    const inactiveUsers = users.filter(u => u.is_active === false)

    useEffect(() => {
        authFetch('/api/users')
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
                return r.json()
            })
            .then(data => setUsers(Array.isArray(data) ? data.filter(u => u.role !== 'admin') : []))
            .catch(() => {})
    }, [])

    useEffect(() => {
        if (users.length === 0) return
        const fetchAvatarsSequentially = async () => {
            for (const u of users) {
                try {
                    const res = await authFetch(`/api/user/${u.id}/pic`)
                    if (res.ok) {
                        const blob = await res.blob()
                        setAvatarUrls(prev => ({ ...prev, [u.id]: URL.createObjectURL(blob) }))
                    }
                } catch {}
                await new Promise(resolve => setTimeout(resolve, 50))
            }
        }
        fetchAvatarsSequentially()
    }, [users])

    const handleDeactivate = async () => {
        await authFetch(`/api/users/${userToDelete.id}/deactivate`, { method: 'PATCH' })
        setUsers(users.map(u => u.id === userToDelete.id ? { ...u, is_active: false } : u))
        setUserToDelete(null)
    }

    const handleReactivate = async () => {
        await authFetch(`/api/users/${userToReactivate.id}/reactivate`, { method: 'PATCH' })
        setUsers(users.map(u => u.id === userToReactivate.id ? { ...u, is_active: true } : u))
        setUserToReactivate(null)
    }

    return (
        <div className="min-h-screen bg-surface-cream">
            <NavBarAuth />
            <DeactivateModal user={userToDelete} onConfirm={handleDeactivate} onClose={() => setUserToDelete(null)} />
            <ReactivateModal user={userToReactivate} onConfirm={handleReactivate} onClose={() => setUserToReactivate(null)} />
            <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col gap-6">
                <h1 className="text-3xl font-bold tracking-tight text-text-primary font-heading">
                    {t('Users')}
                </h1>
                <UserSection
                    title={t('ActiveUsers')}
                    users={activeUsers}
                    avatarUrls={avatarUrls}
                    onDeactivate={setUserToDelete}
                    onReactivate={setUserToReactivate}
                />
                <UserSection
                    title={t('InactiveUsers')}
                    users={inactiveUsers}
                    avatarUrls={avatarUrls}
                    onDeactivate={setUserToDelete}
                    onReactivate={setUserToReactivate}
                    inactive
                />
            </div>
        </div>
    )
}