import { useState, useEffect } from 'react'
import SecondaryButton from './SecondaryButton'
import { useTranslation } from 'react-i18next'

const NavBarAuth = () => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setOpen(false)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4">
            <div className="flex items-center justify-between">
                <span className="text-xl text-primary font-heading">Tindog</span>
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