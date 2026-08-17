import React from 'react';
export function Room({dog1_name, dog2_name}) {
        return (
            <div className="channel-item" >
               <div>{dog1_name}</div> 
                <span>{dog2_name}</span>
            </div>
        )
    };
