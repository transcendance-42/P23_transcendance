import Avatar from '../ui/Avatar'

export default function UserRow({ u, avatarUrls, onDeactivate, onReactivate, inactive = false }) {
    return (
        <div className={`flex items-center gap-4 p-4 relative ${inactive ? 'opacity-60' : ''}`}>
            <Avatar url={avatarUrls[u.id]} size="md" />
            <div className="flex flex-1 flex-col min-w-0">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary truncate">
                        {u.first_name} {u.last_name}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        inactive ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'
                    }`}>
                        {inactive ? '● Inactif' : '● Actif'}
                    </span>
                </div>
                <span className="text-xs text-text-caption">{u.email}</span>
            </div>
            {inactive ? (
                <button onClick={() => onReactivate(u)}
                    className="w-6 h-6 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs flex items-center justify-center transition"
                    title="Réactiver">✓</button>
            ) : (
                <button onClick={() => onDeactivate(u)}
                    className="w-6 h-6 rounded-full bg-primary hover:bg-primary-hover text-surface-white text-xs flex items-center justify-center transition"
                    title="Désactiver">✕</button>
            )}
        </div>
    )
}