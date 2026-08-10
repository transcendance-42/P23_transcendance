import React from 'react';
export function Room({name, participants}) {
        return (
            <div className="channel-item" >
               <div>{name}</div> 
                <span>{participants}</span>
            </div>
        )
    };
