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
                <Link to="/terms" className="text-primary underline">{t('Login2')}</Link>.
                    {t('Login3')}{' '}
                <Link to="/privacy" className="text-primary underline cursor-pointer">{t('Privacy')}</Link>.
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
        </>
    )
}
