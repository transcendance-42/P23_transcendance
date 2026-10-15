import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../api/authFetch'
import NavBarAuth from '../components/ui/NavBarAuth'
import Avatar from '../components/ui/Avatar'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import PrimaryButton from '../components/ui/PrimaryButton'
import SecondaryButton from '../components/ui/SecondaryButton'

export default function UsersLayout() {
    const { t } = useTranslation()
    const [users, setUsers] = useState([])
    const [userToDelete, setUserToDelete] = useState(null)
    const [avatarUrls, setAvatarUrls] = useState({})

    useEffect(() => {
        authFetch('/api/users')
            .then(r => r.json())
            .then(data => setUsers(data.filter(u => u.role !== 'admin')))
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
        setUsers(users.filter(u => u.id !== userToDelete.id))
        setUserToDelete(null)
    }

    return (
        <div className="min-h-screen bg-surface-cream">
            <NavBarAuth />
            {userToDelete && (
                <Modal onClose={() => setUserToDelete(null)} width="w-full mx-4 sm:w-96">
                    <ModalHeader title={t('DeleteUser')} />
                    <p className="text-text-caption text-sm text-center">
                        {t('DeleteUserConfirm', { name: `${userToDelete.first_name} ${userToDelete.last_name}` })}
                    </p>
                    <div className="flex gap-3 w-full mt-2">
                        <SecondaryButton onClick={() => setUserToDelete(null)}>{t('Cancel')}</SecondaryButton>
                        <PrimaryButton onClick={handleDeactivate}>{t('Confirm')}</PrimaryButton>
                    </div>
                </Modal>
            )}
            <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight text-text-primary font-heading">
                    {t('Users')}
                </h1>
                <div className="overflow-hidden rounded-2xl border border-surface-alt bg-surface-white shadow-soft">
                    <div className="divide-y divide-surface-alt">
                        {users.map(u => (
                            <div key={u.id} className="flex items-center gap-4 p-4 relative">
                                <Avatar url={avatarUrls[u.id]} size="md" />
                                <div className="flex flex-1 flex-col min-w-0">
                                    <span className="font-semibold text-text-primary truncate">
                                        {u.first_name} {u.last_name}
                                    </span>
                                    <span className="text-xs text-text-caption">{u.email}</span>
                                </div>
                                <button
                                    onClick={() => setUserToDelete(u)}
                                    className="w-6 h-6 rounded-full bg-primary hover:bg-primary-hover text-surface-white text-xs flex items-center justify-center transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}