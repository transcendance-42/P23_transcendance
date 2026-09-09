import React from "react";

export default function ChatHeader({link, dogName}){
    
    return (
        <div>
            <div className='flex items-center justify-between h-16 shrink-0 border-b border-gray-200 bg-indigo-600 px-4 '>
                <button
                    onClick={link}
                    className='rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/30'
                >
                Back
                </button>
                <div>{dogName}</div>
            </div>
        </div>
    );
}