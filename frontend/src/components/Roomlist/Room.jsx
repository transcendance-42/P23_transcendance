import Mascot from "../ui/Mascot"
import { useTranslation } from "react-i18next";

export function Room({match_dog_name, lastSeenAt}) {
    let isOnline;
    if (lastSeenAt && Date.now() - new Date(lastSeenAt).getTime() < 60 * 1000)
        isOnline = true
    else
        isOnline = false
    const { t } = useTranslation() 

        return (
        <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg">
                <Mascot/>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-semibold text-gray-900">
                    {match_dog_name}
                </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span
                    className={`h-2 w-2 rounded-full ${
                        isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                />
                {isOnline ? t('Online') : t('Offline')}
            </span>
            </div>
        </div>
        )
    };
