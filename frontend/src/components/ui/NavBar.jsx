import { useState } from 'react'
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LangSwitcher from './LangSwitcher'

const NavBar = ({ onShowLogin }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    return (
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4 relative">
            <div className="grid grid-cols-3 items-center">
                <button onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className="text-xl text-primary font-bold font-heading text-left">
                    Tindog
                </button>
                <LangSwitcher />
                <div className="flex justify-end">
                    <button className="lg:hidden text-2xl" onClick={() => setOpen(o => !o)}>☰</button>
                    <div className="hidden lg:flex gap-6 text-sm">
                        <SecondaryButton onClick={onShowLogin}>{t('LogIn')}</SecondaryButton>
                        <PrimaryButton to="/register" fullWidth={false}>{t('SignUp')}</PrimaryButton>
                    </div>
                </div>
            </div>
            {open && (
                <div className="lg:hidden absolute top-full right-0 left-0 bg-surface-raised flex flex-col gap-3 px-6 py-4 items-stretch z-50">
                    <SecondaryButton onClick={() => { onShowLogin(); setOpen(false) }}>{t('LogIn')}</SecondaryButton>
                    <PrimaryButton to="/register">{t('SignUp')}</PrimaryButton>
                </div>
            )}
        </nav>
    )
}
export default NavBar