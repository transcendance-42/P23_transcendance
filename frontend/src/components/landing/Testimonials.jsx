import { useTranslation } from 'react-i18next'

export default function Testimonials() {
    const { t } = useTranslation()
    const testimonials = [
        { id: 1, quote: t('Testimonials4'), author: "Chloé & Moka", place: "Buttes-Chaumont" },
        { id: 2, quote: t('Testimonials5'), author: "Karim & Laylow", place: "Belleville" },
        { id: 3, quote: t('Testimonials6'), author: "Inès & Joya", place: "Montreuil" },
    ]
    return (
        <section className="bg-surface-cream px-6 py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
                    {t('Testimonials1')}
                </p>
                <h2 className="font-heading text-3xl font-bold leading-tight font-primary md:text-5xl">
                    {t('Testimonials2')}
                </h2>
                <p className="font-body max-w-xl text-text-caption">
                    {t('Testimonials3')}
                </p>
            </div>

            <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-6 md:flex-row">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="flex flex-1 flex-col gap-4 rounded-md bg-surface-white p-6 shadow-card"
                    >
                        <div className="text-action-fav" aria-label="5 étoiles sur 5">
                            ★★★★★
                        </div>
                        <p className="font-body text-text-secondary">
                            « {testimonial.quote} »
                        </p>
                        <p className="font-body text-sm text-text-caption">
                            {testimonial.author} · {testimonial.place}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}