import { useTranslation } from 'react-i18next'

export default function HowItWorks() {
    const { t } = useTranslation()
    const steps = [
        {
            number: 1,
            title: t('Work4'),
            text: t('Work5'),
        },
        {
            number: 2,
            title: t('Work6'),
            text: t('Work7'),
        },
        {
            number: 3,
            title: t('Work8'),
            text: t('Work9'),
        },
    ]

    return (
        <section className="bg-surface-raised px-6 py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
                    {t('Work1')}
                </p>
                <h2 className="font-heading text-3xl font-bold leading-tight text-primary md:text-5xl">
                    {t('Work2')}
                </h2>
                <p className="font-body max-w-xl text-white">
                    {t('Work3')}
                </p>
            </div>

            <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-6 md:flex-row">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="flex flex-1 flex-col gap-3 rounded-md bg-surface-cream p-6 shadow-soft"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading font-bold text-surface-white">
                            {step.number}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-text-primary">
                            {step.title}
                        </h3>
                        <p className="font-body text-sm text-text-tertiary">
                            {step.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}