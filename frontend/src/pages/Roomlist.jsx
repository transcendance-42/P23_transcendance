import React from 'react'
import { Room } from './../components/Roomlist/Room';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

// les crochet a l'intérieur c'est pour la destructuration javascript sinon ca serait
// export function RoomList (props)
// et ensuite dans la fonction il faudarit faire
// const rooms = props.rooms 
export function RoomList ({}) {

    const [rooms, setRooms] = useState([]);

    const loadRooms = async () => {
        console.log("start the loading of the rooms")
        const response = await fetch('/api/matches');
        const data = await response.json();
        setRooms(data);
        console.log("i want show what i got")
        console.log(data)
    }

    useEffect(() => {
        loadRooms();
    }, [])

    let list = `There is no channels to show`;
    if (rooms) {
        list = rooms.map(c => (
        <Link    
            key={c.id}
            to={`/room/${c.id}`}
        >
        <Room
            dog1_name={c.matchesAsDog1.dog_name}
            dog2_name={c.matchesAsDog2.dog_name}
        />
        </Link>
        ));
    }
    return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-10">
        <div className="mx-auto w-full max-w-4xl">

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Vos matchs 🐶
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
        );
    }