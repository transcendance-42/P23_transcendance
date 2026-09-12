import React from "react";

export default function ChatHeader({link, dogName}){
    
    return (
        <div>
            <div className='flex items-center justify-between h-16 shrink-0 border-b border-gray-200 bg-surface-sunken px-4 '>
                <button onClick={link}
                    className='md:hidden bg-primary hover:bg-primary-hover text-surface-white rounded-md px-3 py-2 text-sm font-semibold transition'
                >
                Back
                </button>
                <div className="text-surface-white font-semibold">{dogName}</div>
            </div>
        </div>
    );
}