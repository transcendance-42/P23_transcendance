import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useTranslation } from 'react-i18next'

export default function RequireAuth({ children }) {
    const { t } = useTranslation()
    const { token, loading, waitInSeconds } = useAuth()
    if (loading)
        return <div className="min-h-screen flex items-center justify-center">{t("Loading")}</div>
    if (waitInSeconds > 0)
        return <div className="min-h-screen flex items-center justify-center">{t('ErrorRefresh', { seconds: waitInSeconds })}</div>
    if (!token)
        return <Navigate to="/" replace />
    return children
}
