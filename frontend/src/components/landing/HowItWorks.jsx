export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: "Crée sa fiche",
            text: "Sa plus belle bouille, son grain de folie, ses races préférées. Deux minutes, museau compris.",
        },
        {
            number: 2,
            title: "Swipe & matche",
            text: "Découvre les toutous compatibles du quartier et matche ses coups de cœur.",
        },
        {
            number: 3,
            title: "File au parc",
            text: "On papote, on fixe le point de rendez-vous, et c'est parti pour la balade.",
        },
    ]

    return (
        <section className="bg-surface-raised px-6 py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
                    Comment ça marche
                </p>
                <h2 className="font-heading text-3xl font-bold leading-tight text-primary md:text-5xl">
                    Du profil à la balade.
                </h2>
                <p className="font-body max-w-xl text-white">
                    Trois reniflages et c'est parti : on lui fait une fiche irrésistible,
                    on matche les bons copains, on file gambader.
                </p>
            </div>

            <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-6 md:flex-row">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="flex flex-1 flex-col gap-3 rounded-md bg-surface-white p-6 shadow-soft"
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