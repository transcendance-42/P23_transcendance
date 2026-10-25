import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Mascot from '../components/ui/Mascot'
import { useAuth } from '../auth/AuthContext'

export default function NotFound() {
    const { t } = useTranslation()
    const { user } = useAuth()
    return (
        <div className="min-h-screen bg-surface-cream flex flex-col items-center justify-center gap-4">
            <Mascot index={2} size="lg" />
            <h1 className="font-heading text-4xl font-bold text-text-primary">404</h1>
            <p className="text-text-caption">{t('PageNotFound')}</p>
            <Link to={user ? '/swipes' : '/'} className="text-primary hover:underline text-sm">
                {t('BackHome')}
            </Link>
        </div>
    )
}