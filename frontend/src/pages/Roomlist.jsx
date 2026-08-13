import React from 'react'
import { Room } from './Room';

// les crochet a l'intérieur c'est pour la destructuration javascript sinon ca serait
// export function RoomList (props)
// et ensuite dans la fonction il faudarit faire
// const rooms = props.rooms 
export function RoomList ({rooms}) {
        let list = `There is no channels to show`;
        if (rooms) {
            list = rooms.map(c => (
            <Room
                id={c.id}
                id_dog1={c.id_dog1}
                id_dog2={c.id_dog2}
                created_at={c.created_at}
            />
            ));
        }
        return (
            <div className="room-list">
                {list}
            </div>
            );
        }