import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const OfflineBanner = () => {
    const { t } = useTranslation()
    const [offline, setOffline] = useState(!navigator.onLine)

    useEffect(() => {
        const goOffline = () => setOffline(true)
        const goOnline = () => setOffline(false)
        window.addEventListener('offline', goOffline)
        window.addEventListener('online', goOnline)
        return () => {
            window.removeEventListener('offline', goOffline)
            window.removeEventListener('online', goOnline)
        }
    }, [])

    if (!offline) return null

    return (
        <div role="status" aria-live="polite"
             className="fixed bottom-0 inset-x-0 z-[60] bg-action-fav text-text-primary text-sm font-semibold text-center px-4 py-2">
            {t('OfflineBanner')}
        </div>
    )
}

export default OfflineBanner