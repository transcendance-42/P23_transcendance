import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import SecondaryButton from './SecondaryButton'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
import LangSwitcher from './LangSwitcher'
import { authFetch } from '../../api/authFetch'

const NavBarAuth = () => {
    const { logout, user } = useAuth()
    const { t } = useTranslation()
    const [lang, setLang] = useState('en')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [unreadCount, setUnreadCount] = useState(0)

    const isProfileComplete = user?.role === 'admin' ? false : !!(
        user?.first_name &&
        user?.last_name &&
        user?.city &&
        user?.date_of_birth &&
        user?.file_path &&
        !!user?.dogs
    )

    const handleLogout = async () => {
        try {
            await logout()
        } finally { // pour etre sur que le navigate si la promesse n'est pas retournée
            navigate('/')            
        }
    }
    const changeLang = (l) => {
        setLang(l)
        i18n.changeLanguage(l)
    }

    useEffect(() => {
        const handleClickOutside = () => setOpen(false)
        window.addEventListener('mousedown', handleClickOutside)
        return () => window.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (user?.role === 'admin') return
        const fetchUnread = () => {
            authFetch('/api/messages/unread-count')
                .then(r => r.json())
                .then(data => setUnreadCount(data.unreadMessages || 0))
                .catch(() => {})
        }
        fetchUnread()
        const interval = setInterval(fetchUnread, 30000)
        return () => { clearInterval(interval) }
    }, [user])

    return (
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4 relative">
            <div className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-6">
                    <button onClick={() => { navigate('/swipes'); window.scrollTo(0, 0) }} className="text-xl text-primary font-bold font-heading text-left">
                        Tindog
                    </button>
                    {user?.role === 'admin' && (
                        <span className="text-xs font-bold text-surface-white bg-primary px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Admin
                        </span>
                    )}
                </div>
                <LangSwitcher />
                <div className="flex justify-end">
                    <button className="lg:hidden text-2xl" onMouseDown={(e) => { e.stopPropagation(); setOpen(!open) }}>☰</button>
                    <div className="hidden lg:flex gap-6 text-sm">
                    <SecondaryButton to="/swipes" disabled={!isProfileComplete}>{t('Swipes')}</SecondaryButton>
                    {user?.role === 'admin' ? (
                    <SecondaryButton to="/users">{t('Users')}</SecondaryButton>
                ) : (
                    <div className="relative inline-flex">
                        <SecondaryButton to="/chat" disabled={!isProfileComplete}>
                            <span className="flex items-center gap-2.5">
                                {t('Chat')}
                                {unreadCount > 0 && (
                                    <span className="w-3 h-3 bg-red-700 rounded-full inline-block" />
                                )}
                            </span>
                        </SecondaryButton>
                    </div>
                )}
                    <SecondaryButton to="/profile">{t('Profile')}</SecondaryButton>
                    <SecondaryButton onClick={handleLogout}>{t('Logout')}</SecondaryButton>
                </div>
            </div>
            </div>
            {open && (
                <div 
                    onMouseDown={e => e.stopPropagation()}
                    className="lg:hidden absolute top-full left-0 right-0 bg-surface-raised flex flex-col gap-3 px-6 py-4 items-stretch z-50"
                >
                    {user?.role === 'admin' ? (
                        <SecondaryButton to="/users" onClick={() => setOpen(false)}>{t('Users')}</SecondaryButton>
                    ) : (
                        <>
                            <SecondaryButton to="/swipes" disabled={!isProfileComplete} onClick={() => setOpen(false)}>{t('Swipes')}</SecondaryButton>
                            <SecondaryButton to="/chat" disabled={!isProfileComplete} onClick={() => setOpen(false)}>{t('Chat')}</SecondaryButton>
                        </>
                    )}
                    <SecondaryButton to="/profile" onClick={() => setOpen(false)}>{t('Profile')}</SecondaryButton>
                    <SecondaryButton onClick={() => { setOpen(false); handleLogout() }}>{t('Logout')}</SecondaryButton>
                </div>
            )}
        </nav>
    )
}
export default NavBarAuth