import { Room } from './../components/Roomlist/Room';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import NavBarAuth from '../components/ui/NavBarAuth';

export function RoomList () {

    const id = localStorage.getItem('userId')
    let userDogName;
    let matchDogName;


    const [rooms, setRooms] = useState([]);

    const loadRooms = async () => {
        const response = await fetch(`/api/matches/${id}`);
        const data = await response.json();
        setRooms(data);
        console.log(data)
    }

    useEffect(() => {
        if (id)
            loadRooms();
    }, [])

    let list = `You don't have any matchs yet. Go swipe :)`;
    if (rooms && rooms.length > 0) {
        list = rooms.map(c => {
        if (c.matchesAsDog1.owner_id === id) {
            matchDogName = c.matchesAsDog2.dog_name;
            userDogName = c.matchesAsDog1.dog_name;
        }
        else {
            matchDogName = c.matchesAsDog1.dog_name;
            userDogName = c.matchesAsDog2.dog_name;
        }
        console.log(matchDogName);
        return(        
        <Link    
            key={c.id}
            to={`/room/${c.id}`}
        >
        <Room
            match_dog_name={matchDogName}
        />
        </Link>)
        });
    }
    return (
    <div>
        <NavBarAuth/>
    <div className="min-h-screen w-full bg-gray-50 px-4 py-10">
        <div className="mx-auto w-full max-w-4xl">

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Les matchs de {userDogName} 🐶
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Retrouvez vos conversations
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="divide-y divide-gray-100">
                    {list}
                </div>
            </div>

        </div>
    </div>
    </div>
        );
    }