import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import { useTranslation } from 'react-i18next'
import BackButton from '../components/ui/BackButton'

export default function Privacy() {
    const { t } = useTranslation()
    return (
        <div className="min-h-screen bg-surface-raised text-surface-white">
            <NavBar />
            <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-8">
                <div><BackButton /></div>
                <h1 className="font-heading text-4xl text-primary">{t('Privacy')}</h1>
                <p className="text-text-caption text-sm">{t('Update')}</p>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Privacy2')}</h2>
                    <p className="text-text-caption text-sm leading-relaxed">{t('Privacy3')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Privacy4')}</h2>
                    <p className="text-text-caption text-sm leading-relaxed">{t('Privacy5')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Privacy6')}</h2>
                    <p className="text-text-caption text-sm leading-relaxed">{t('Privacy7')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Privacy8')}</h2>
                    <p className="text-text-caption text-sm leading-relaxed">{t('Privacy9')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Privacy10')}</h2>
                    <p className="text-text-caption text-sm leading-relaxed">{t('Privacy11')}</p>
                </section>
            </div>
            <Footer />
        </div>
    )
}