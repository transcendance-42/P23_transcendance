import React from 'react';
export function Room({dog1_name, dog2_name, onClick}) {
        return (
            <div className="channel-item" 
                onClick={onClick}            
                >
               <div>{dog1_name}</div> 
                <span>{dog2_name}</span>
            </div>
        )
    };
