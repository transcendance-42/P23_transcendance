import { useState, useEffect } from 'react'
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
    const { t } = useTranslation()
    const [lang, setLang] = useState('en')
    const changeLang = (l) => {
        setLang(l)
        i18n.changeLanguage(l)
    }
    const [open, setOpen] = useState(false)
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
                <SecondaryButton to="/login">{t('LogIn')}</SecondaryButton>
                <PrimaryButton to="/register" fullWidth={false}>{t('SignUp')}</PrimaryButton>
            </div>
            </div>
        </div>  
            {open && (
                <div className="sm:hidden flex flex-col gap-3 mt-4">
                    <SecondaryButton to="/login">{t('LogIn')}</SecondaryButton>
                    <PrimaryButton to="/register">{t('SignUp')}</PrimaryButton>
                </div>
            )}
        </nav>
    )
}
export default NavBar