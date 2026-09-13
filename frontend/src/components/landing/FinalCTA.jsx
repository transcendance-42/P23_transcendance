import { Link } from "react-router-dom"
import CallToAction from "./CallToAction"

export default function FinalCTA() {
    return (
        <section className="bg-surface-sunken px-6 py-24">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary">
                    C'est ton tour
                </p>
                <h2 className="font-heading text-3xl font-bold leading-tight text-surface-white md:text-5xl">
                    Son prochain copain renifle déjà par ici.
                </h2>
                <p className="font-body text-text-caption">
                    Rejoins les toutous du quartier. C'est gratuit, et sans laisse.
                </p>

                <CallToAction to="/register">Trouve son match →</CallToAction>

                <p className="font-body text-sm text-text-caption">
                    Déjà membre ?{" "}
                    <Link to="/login" className="font-semibold text-primary hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </section>
    )
}