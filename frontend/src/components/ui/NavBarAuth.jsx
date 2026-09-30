import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import SecondaryButton from './SecondaryButton'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

const NavBarAuth = () => {
    const { t } = useTranslation()
    const [lang, setLang] = useState('en')
    const [open, setOpen] = useState(false)
    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        fetch('/api/auth/logout', { 
            metho: 'POST',
            credentials: 'include' })
        await logout()
        navigate('/')
    }
    const changeLang = (l) => {
        setLang(l)
        i18n.changeLanguage(l)
    }

    useEffect(() => {
        const handleScroll = () => setOpen(false)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4 relative">
            <div className="grid grid-cols-3 items-center">
                <span className="text-xl text-primary font-bold font-heading">Tindog</span>
                <div className="flex justify-center gap-4">
                    {['fr', 'en', 'de'].map(l => (
                        <button key={l} onClick={() => changeLang(l)}
                            className={`text-2xl transition-all hover:scale-110 ${lang === l ? 'opacity-100 scale-110' : 'opacity-30'}`}>
                            {l === 'fr' ? '🇫🇷' : l === 'en' ? '🇬🇧' : '🇩🇪'}
                        </button>
                    ))}
                </div>
                <div className="flex justify-end">
                    <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
                    <div className="hidden lg:flex gap-6 text-sm">
                    <SecondaryButton to="/swipes">{t('Swipes')}</SecondaryButton>
                    <SecondaryButton to="/chat">{t('Chat')}</SecondaryButton>
                    <SecondaryButton to="/profile">{t('Profile')}</SecondaryButton>
                    <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
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