import React from 'react'
import { Room } from './Room';

export function RoomList ({channels}) {
        let list = `There is no channels to show`;
        if (channels) {
            list = channels.map(c => (
            <Room
                key={c.id}
                id={c.id}
                name={c.name}
                participants={c.participants}
            />
            ));
        }
        return (
            <div className="room-list">
                {list}
            </div>
            );
        }