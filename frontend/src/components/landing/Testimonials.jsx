const testimonials = [
    {
        id: 1,
        quote: "Moka a rencontré Nala un dimanche. Depuis, ils s'attendent au parc chaque semaine.",
        author: "Chloé & Moka",
        place: "Buttes-Chaumont",
    },
    {
        id: 2,
        quote: "Je ne connaissais personne dans le quartier. Trois balades plus tard, on est une bande.",
        author: "Karim & Laylow",
        place: "Belleville",
    },
    {
        id: 3,
        quote: "Ma chienne est timide, je filtrais mal. Ici les profils sont clairs, ça change tout.",
        author: "Inès & Joya",
        place: "Montreuil",
    },
]

export default function Testimonials() {
    return (
        <section className="bg-surface-white px-6 py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
                    Après le match
                </p>
                <h2 className="font-heading text-3xl font-bold leading-tight font-primary md:text-5xl">
                    Et puis un jour, ils se rencontrent.
                </h2>
                <p className="font-body max-w-xl text-text-caption">
                    Le match n'est qu'un début. Les vraies histoires s'écrivent au parc,
                    laisse au vent, entre deux toutous devenus inséparables.
                </p>
            </div>

            <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-6 md:flex-row">
                {testimonials.map((t) => (
                    <div
                        key={t.id}
                        className="flex flex-1 flex-col gap-4 rounded-md bg-surface-white p-6 shadow-card"
                    >
                        <div className="text-action-fav" aria-label="5 étoiles sur 5">
                            ★★★★★
                        </div>
                        <p className="font-body text-text-secondary">
                            « {t.quote} »
                        </p>
                        <p className="font-body text-sm text-text-caption">
                            {t.author} · {t.place}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}