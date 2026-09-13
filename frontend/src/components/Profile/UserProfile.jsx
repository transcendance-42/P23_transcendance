export default function UserProfile({ user }) {
    return (
        <div className="rounded-md bg-surface-white p-6 shadow-soft">
            <h2 className="font-heading text-lg font-bold text-text-primary">Mon compte</h2>

            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">Prénom</dt>
                    <dd className="text-text-secondary">{user.first_name}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">Nom</dt>
                    <dd className="text-text-secondary">{user.last_name}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">Ville</dt>
                    <dd className="text-text-secondary">{user.city}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">Email</dt>
                    <dd className="text-text-secondary">{user.email}</dd>
                </div>
            </dl>
        </div>
    )
}