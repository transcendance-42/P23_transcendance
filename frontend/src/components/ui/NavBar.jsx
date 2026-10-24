import { useState, useEffect } from 'react'
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LangSwitcher from './LangSwitcher'
import LoginPopup from '../login/LoginPopup'

const NavBar = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const handleScroll = () => setOpen(false)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    const [showLogin, setShowLogin] = useState(false)
    return (
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4 relative">
            <div className="grid grid-cols-3 items-center">
                <button onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className="text-xl text-primary font-bold font-heading text-left">
                    Tindog
                </button>
                <LangSwitcher />
            <div className="flex justify-end">
            <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
            <div className="hidden lg:flex gap-6 text-sm">
                <SecondaryButton onClick={() => setShowLogin(true)}>{t('LogIn')}</SecondaryButton>
                <PrimaryButton to="/register" fullWidth={false}>{t('SignUp')}</PrimaryButton>
            </div>
            </div>
        </div>  
            {open && (
                <div className="lg:hidden flex flex-col gap-3 mt-4">
                    <SecondaryButton onClick={() => setShowLogin(true)}>{t('LogIn')}</SecondaryButton>
                    <PrimaryButton to="/register">{t('SignUp')}</PrimaryButton>
                </div>
            )}
            {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
        </nav>
    )
}
export default NavBar