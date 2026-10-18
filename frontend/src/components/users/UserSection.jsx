import UserRow from './UserRow'

export default function UserSection({ title, users, avatarUrls, onDeactivate, onReactivate, inactive = false }) {
    if (users.length === 0) return null

    return (
        <div>
            <p className="text-xs font-semibold text-text-caption uppercase tracking-widest mb-2 px-1">
                {title} ({users.length})
            </p>
            <div className="overflow-hidden rounded-2xl border border-surface-alt bg-surface-white shadow-soft">
                <div className="divide-y divide-surface-alt">
                    {users.map(u => (
                        <UserRow
                            key={u.id}
                            u={u}
                            avatarUrls={avatarUrls}
                            onDeactivate={onDeactivate}
                            onReactivate={onReactivate}
                            inactive={inactive}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}