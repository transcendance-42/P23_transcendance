import { useState, useEffect } from 'react'
import SecondaryButton from './SecondaryButton'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

const NavBarAuth = () => {
    const { t } = useTranslation()
    const [lang, setLang] = useState('en')
    const [open, setOpen] = useState(false)
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
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4">
            <div className="flex items-center justify-between">
                <span className="text-xl text-primary font-heading">Tindog</span>
                <div className="flex gap-4">
                    {['fr', 'en', 'de'].map(l => (
                        <button key={l} onClick={() => changeLang(l)}
                            className={`text-2xl transition-all hover:scale-110 ${lang === l ? 'opacity-100 scale-110' : 'opacity-30'}`}>
                            {l === 'fr' ? '🇫🇷' : l === 'en' ? '🇬🇧' : '🇩🇪'}
                        </button>
                    ))}
                </div>
                <button className="sm:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
                <div className="hidden sm:flex gap-6 text-sm">
                    <SecondaryButton to="/swipes">{t('Swipes')}</SecondaryButton>
                    <SecondaryButton to="/matches">{t('Matches')}</SecondaryButton>
                    <SecondaryButton to="/chat">{t('Chat')}</SecondaryButton>
                    <SecondaryButton to="/profile">{t('Profile')}</SecondaryButton>
                </div>
            </div>
            {open && (
                <div className="sm:hidden flex flex-col gap-3 mt-4">
                    <SecondaryButton to="/swipes">{t('Swipes')}</SecondaryButton>
                    <SecondaryButton to="/matches">{t('Matches')}</SecondaryButton>
                    <SecondaryButton to="/chat">{t('Chat')}</SecondaryButton>
                    <SecondaryButton to="/profile">{t('Profile')}</SecondaryButton>
                </div>
            )}
        </nav>
    )
}
export default NavBarAuth