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
        const fetchUnread = () => {
            authFetch('/api/messages/unread-count')
                .then(r => r.json())
                .then(data => setUnreadCount(data.unreadMessages || 0))
                .catch(() => {})
        }
        fetchUnread()
        const interval = setInterval(fetchUnread, 30000)
        const handleScroll = () => setOpen(false)
        window.addEventListener('scroll', handleScroll)
        return () => { clearInterval(interval); window.removeEventListener('scroll', handleScroll) }
    }, [])
    return (
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4 relative">
            <div className="grid grid-cols-3 items-center">
                <div className="flex items-center gap-6">
                    <span className="text-xl text-primary font-bold font-heading">Tindog</span>
                    {user?.role === 'admin' && (
                        <span className="text-xs font-bold text-surface-white bg-primary px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Admin
                        </span>
                    )}
                </div>
                <LangSwitcher />
                <div className="flex justify-end">
                    <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
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
                    <div className="lg:hidden flex flex-col gap-3 mt-4 items-end">
                    <SecondaryButton to="/swipes">{t('Swipes')}</SecondaryButton>
                    <SecondaryButton to="/chat">{t('Chat')}</SecondaryButton>
                    <SecondaryButton to="/profile">{t('Profile')}</SecondaryButton>
                    <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
                </div>
            )}
        </nav>
    )
}
export default NavBarAuth