import CallToAction from "./CallToAction"
import { useTranslation } from 'react-i18next'

export default function FinalCTA({ onShowLogin }) {
    const { t } = useTranslation()
    return (
        <section className="bg-surface-sunken px-6 py-24">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
                    {t('CTA1')}
                </p>
                <h2 className="font-heading text-3xl font-bold leading-tight text-surface-white md:text-5xl">
                    {t('CTA2')}
                </h2>
                <p className="font-body text-text-caption">
                    {t('CTA3')}
                </p>

                <CallToAction to="/register">{t('CTA4')}</CallToAction>

                <p className="font-body text-sm text-text-caption">
                    {t('AlreadyMember')}{" "}
                    <button onClick={onShowLogin} className="font-semibold text-primary hover:underline">
                        {t('LogIn')}
                    </button>
                </p>
            </div>
        </section>
    )
}