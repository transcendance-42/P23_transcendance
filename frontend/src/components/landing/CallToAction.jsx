import { Link } from "react-router-dom"

export default function CallToAction({to, children}){
    return (
        <Link to={to} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-body font-semibold text-surface-white shadow-card transition hover:bg-primary-hover">
            {children}
        </Link>
    )
}