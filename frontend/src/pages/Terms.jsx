import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import { useTranslation } from 'react-i18next'

export default function Terms() {
    const { t } = useTranslation()
    return (
        <div className="min-h-screen bg-surface-raised text-surface-white">
            <NavBar />
            <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-8">
                <h1 className="font-heading text-4xl text-primary">{t('Terms')}</h1>
                <p className="text-text-caption text-sm">{t('Update')}</p>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Terms1')}</h2>
                    <p className="text-text-caption text-sm leading-relaxed">{t('Terms2')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Terms3')}</h2>
                    <p className="text-text-caption  text-sm leading-relaxed">{t('Terms4')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Terms5')}</h2>
                    <p className="text-text-caption  text-sm leading-relaxed">{t('Terms6')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Terms7')}</h2>
                    <p className="text-text-caption  text-sm leading-relaxed">{t('Terms8')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Terms9')}</h2>
                    <p className="text-text-caption  text-sm leading-relaxed">{t('Terms10')}</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">{t('Terms11')}</h2>
                    <p className="text-text-caption text-sm leading-relaxed">{t('Terms12')}</p>
                </section>
            </div>
            <Footer />
        </div>
    )
}