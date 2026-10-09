import Avatar from "../ui/Avatar"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export function Room({ match_dog_name, lastSeenAt, roomId, onProfileClick }) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const isOnline = lastSeenAt && Date.now() - new Date(lastSeenAt).getTime() < 60 * 1000

    return (
        <div
            onClick={onProfileClick}
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-primary hover:bg-primary/5 hover:shadow-sm"
        >
            <div className="shrink-0">
                <Avatar size="md" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-semibold text-gray-900">
                    {match_dog_name}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {isOnline ? t('Online') : t('Offline')}
                </span>
            </div>

            <button onClick={(e) => { e.stopPropagation(); navigate(`/matches/${roomId}`) }} className="shrink-0 w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-surface-white flex items-center justify-center transition ml-2 mr-8" title={t('OpenChat')} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
            </button>
        </div>
    )
}