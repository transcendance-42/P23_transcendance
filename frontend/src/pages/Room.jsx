import React from 'react';
export function Room({id, id_dog1}) {
        return (
            <div className="channel-item" >
               <div>{id}</div> 
                <span>{id_dog1}</span>
            </div>
        )
    };
