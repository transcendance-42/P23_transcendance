import { Room } from './../components/Roomlist/Room';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../api/authFetch';
import { useAuth } from '../auth/AuthContext';

export function RoomList () {
    const { t } = useTranslation()
    const { userId } = useAuth()
    const [rooms, setRooms] = useState([]);
    console.log('MON USER:')
    console.log(userId)

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

    let list = `You don't have any matchs yet. Go swipe :)`;
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
    <div className="border-r w-full overflow-y-auto bg-gray-50 p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {t('RoomList1')} {userDogName}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    {t('RoomList2')}
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="divide-y divide-gray-100">
                    {list}
                </div>
            </div>

        </div>
        );
    }
    