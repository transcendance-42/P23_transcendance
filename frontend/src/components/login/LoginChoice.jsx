import { Link } from 'react-router-dom'
import PrimaryButton from '../ui/PrimaryButton'
import Modal from '../ui/Modal'
import ModalHeader from '../ui/ModalHeader'
import Mascot from '../ui/Mascot'
import { useTranslation } from 'react-i18next'
import LangSwitcher from '../ui/LangSwitcher'

export default function LoginChoice({onEmail}) {
    const { t } = useTranslation()

    return (
            <> 
           <div className="flex gap-4 self-end">
                <LangSwitcher />
            </div>
            <Mascot index={0} size="lg"/>
            <ModalHeader title={t('GetStarted')} />
            <p className="text-xs text-text-caption text-center">
                {t('Login1')}{' '}
                <span className="text-primary underline cursor-pointer">{t('Login2')}</span>.
                    {t('Login3')}{' '}
                <span className="text-primary underline cursor-pointer">{t('Privacy')}</span>.
            </p>

            <button onClick={onEmail} className="w-full flex items-center justify-center gap-3 border border-text-tertiary rounded-full py-3 hover:bg-surface-raised transition">
                {t('Login4')}
            </button>

            <a href="/api/auth/google"
                className="w-full flex items-center justify-center gap-3 border border-text-tertiary rounded-full py-3 hover:bg-surface-raised transition text-surface-white">
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
                {t('Login5')}
            </a>

            <PrimaryButton to="/register">{t('Login6')}</PrimaryButton>

            <p className="text-primary text-sm underline cursor-pointer">
                {t('Login7')}
            </p>
        </>
    )
}
