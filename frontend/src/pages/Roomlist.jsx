import { Room } from './../components/Roomlist/Room';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../api/authFetch';
import { useAuth } from '../auth/AuthContext';
import Mascot from '../components/ui/Mascot'

export function RoomList () {
    const { t } = useTranslation()
    const { userId } = useAuth()
    const [rooms, setRooms] = useState([]);

    const loadRooms = async () => {
        const response = await authFetch(`/api/matches/me`);
        const data = await response.json();
        setRooms(data);
    }

    useEffect(() => {
            loadRooms();
    }, [])

    const monChien = (match) => (
            match.matchesAsDog1.owner_id === userId ? match.matchesAsDog1.dog_name : match.matchesAsDog2.dog_name
    )
    const userDogName = rooms.length > 0 ? monChien(rooms[0]) : '';

    let list = (
        <div className="flex flex-col items-center gap-3 p-8 text-text-caption">
            <Mascot index={1} size="md" />
            <p className="text-sm">{t('NoMatches')}</p>
        </div>
    )
    if (rooms && rooms.length > 0) {
        list = rooms.map(c => {
        const matchDogName = c.matchesAsDog1.owner_id === userId ? c.matchesAsDog2.dog_name : c.matchesAsDog1.dog_name;
        return(        
        <Link    
            key={c.id}
            to={`/chat/${c.id}`}
        >
        <Room
            match_dog_name={matchDogName}
        />
        </Link>)
        });
    }
    return (
    <div className="border-r w-full overflow-y-auto bg-surface-cream p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-text-primary font-heading">
                    {t('RoomList1')} {userDogName}
                </h1>

                <p className="mt-2 text-sm text-text-caption">
                    {t('RoomList2')}
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-surface-alt bg-surface-white shadow-soft">
                <div className="divide-y divide-surface-alt">
                    {list}
                </div>
            </div>

        </div>
        );
    }
    