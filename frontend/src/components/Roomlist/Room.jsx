import React from 'react';

export function Room({dog1_name, dog2_name}) {
        return (
        <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg">
                🐶
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-semibold text-gray-900">
                    {dog1_name}
                </span>

                <span className="truncate text-sm text-gray-500">
                    {dog2_name}
                </span>
            </div>
        </div>
        )
    };
