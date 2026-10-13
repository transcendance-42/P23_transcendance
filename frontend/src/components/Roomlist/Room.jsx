import Avatar from "../ui/Avatar"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react"
import { authFetch } from "../../api/authFetch"

export function Room({match_dog_name, lastSeenAt, matchUserId, hasUnread}) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const { t } = useTranslation() 
    let isOnline;
    
    if (lastSeenAt && Date.now() - new Date(lastSeenAt).getTime() < 60 * 1000)
        isOnline = true
    else
        isOnline = false
    
    useEffect(() => {
        if (!matchUserId) return
        authFetch(`/api/user/${matchUserId}/pic`)
            .then(res => res.ok ? res.blob() : null)
            .then(blob => { if (blob) setAvatarUrl(URL.createObjectURL(blob)) })
            .catch(() => {})
    }, [matchUserId])

    return (
        <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg">
                <Avatar url={avatarUrl} size="md" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center gap-2 truncate font-semibold text-gray-900">
                    {match_dog_name}
                    {hasUnread && <span className="w-2.5 h-2.5 bg-red-700 rounded-full shrink-0" />}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {isOnline ? t('Online') : t('Offline')}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {isOnline ? t('Online') : t('Offline')}
                </span>
            </div>
        </div>
    )
    }
