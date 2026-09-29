import { Link } from 'react-router-dom'
import Mascot from "./Mascot"
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const { t } = useTranslation()
    return (
        <footer className="w-full bg-surface-raised text-text-caption text-xs">
        <div className="max-w-4xl mx-auto px-8 py-10 relative flex items-center justify-center">
        <div className="absolute left-8">
            <Mascot index={2} size="md" />
        </div>
        <div className="flex flex-col items-center gap-6">
            <span className="text-xl text-primary font-heading font-bold">Tindog</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link to="/privacy" className="hover:text-surface-white transition">{t('Privacy')}</Link>
                <Link to="/terms" className="hover:text-surface-white transition">{t('Terms')}</Link>
                <Link to="/contact" className="hover:text-surface-white transition">{t('ContactUs')}</Link>
            </div>
            <p>{t('Rights')}</p>
        </div>
    </div>
    </footer>
    )
}
    

export default Footer