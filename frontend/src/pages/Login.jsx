import { Link } from 'react-router-dom'
import PrimaryButton from '../components/ui/PrimaryButton'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import Mascot from '../components/ui/Mascot'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import i18n from '../i18n'

export default function Login() {
    const { t } = useTranslation()
    const [lang, setLang] = useState('en')

    const changeLang = (l) => {
        setLang(l)
        i18n.changeLanguage(l)
    }

    return (
        <div className="min-h-screen bg-surface-cream">
        <Modal>
            <div className="flex gap-4 self-end">
                {['fr', 'en', 'de'].map(l => (
                    <button key={l} onClick={() => changeLang(l)}
                        className={`text-xl transition-all hover:scale-110 ${lang === l ? 'opacity-100' : 'opacity-30'}`}>
                        {l === 'fr' ? '🇫🇷' : l === 'en' ? '🇬🇧' : '🇩🇪'}
                    </button>
                ))}
            </div>
            <Mascot index={0} size="lg"/>
            <ModalHeader title="Get Started" />
            <p className="text-xs text-text-caption text-center">
                {t('Login1')}{' '}
                <span className="text-primary underline cursor-pointer">{t('Login2')}</span>.
                    {t('Login3')}{' '}
                <span className="text-primary underline cursor-pointer">{t('Privacy')}</span>.
            </p>

            <Link to="/login/email" className="w-full flex items-center justify-center gap-3 border border-text-tertiary rounded-full py-3 hover:bg-surface-raised transition">
                {t('Login4')}
            </Link>

            <a href="/api/auth/google"
                className="w-full flex items-center justify-center gap-3 border border-text-tertiary rounded-full py-3 hover:bg-surface-raised transition text-surface-white">
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
                {t('Login5')}
            </a>

            <PrimaryButton to="/register">{t('Login6')}</PrimaryButton>

            <p className="text-primary text-sm underline cursor-pointer">
                {t('Login7')}
            </p>
        </Modal>
        </div>
    )
}
