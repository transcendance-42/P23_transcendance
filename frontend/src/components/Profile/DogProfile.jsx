export default function DogProfile({ dog, onChange }) {
    return (
        <div className="rounded-md bg-surface-white p-6 shadow-soft">
            <h2 className="font-heading text-2xl font-bold text-text-primary">
                {dog.dog_name}
            </h2>

            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">Race</dt>
                    <dd className="text-text-secondary">{dog.breed || '—'}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">Âge</dt>
                    <dd className="text-text-secondary">{dog.age} ans</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">Taille</dt>
                    <dd className="text-text-secondary">{dog.size}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">Genre</dt>
                    <dd className="text-text-secondary">
                        {dog.gender === 'Male' ? '♂' : dog.gender === 'Female' ? '♀' : ''} {dog.gender}
                    </dd>
                </div>
            </dl>

            <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-text-caption">Bio</p>
                <p className="mt-1 text-text-secondary">{dog.bio}</p>
            </div>
        </div>
    )
}