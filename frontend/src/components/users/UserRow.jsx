import Avatar from '../ui/Avatar'

export default function UserRow({ u, avatarUrls, onDeactivate, onReactivate, onDelete, inactive = false }) {
    return (
        <div className={`flex items-center gap-4 p-4 relative ${inactive ? 'opacity-60' : ''}`}>
            <Avatar url={avatarUrls[u.id]} size="md" />
            <div className="flex flex-1 flex-col min-w-0">
                <span className="font-semibold text-text-primary truncate">
                    {u.first_name} {u.last_name}
                </span>
                <span className="text-xs text-text-caption">{u.email}</span>
            </div>
            {inactive ? (
                <button onClick={() => onReactivate(u)}
                    className="w-6 h-6 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs flex items-center justify-center transition"
                    title="Réactiver">✓</button>
            ) : (
                <button onClick={() => onDeactivate(u)}
                    className="w-6 h-6 rounded-full bg-gray-400 hover:bg-gray-500 text-white text-xs flex items-center justify-center transition"
                    title="Désactiver">✕</button>
            )}
            <button onClick={() => onDelete(u)}
                    className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs flex items-center justify-center transition"
                    title="Supprimer">✕</button>
        </div>
    )
}