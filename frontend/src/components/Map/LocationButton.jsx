import { useState } from 'react'
import MapModal from './MapModal'

export default function LocationButton() {
    const [showMap, setShowMap] = useState(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setShowMap(true)}
                className="w-full bg-transparent border border-text-tertiary rounded-lg px-4 py-3 text-white flex items-center gap-3"
            >
                <span className="w-7 h-7 rounded-full border border-white flex items-center justify-center">
                    🌍
                </span>

                <span>
                    Localisation
                </span>
            </button>

            {showMap && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

                    <div className="relative">

                        <MapModal />

                        <button
                            type="button"
                            onClick={() => setShowMap(false)}
                            className="absolute top-2 right-2 z-50 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl"
                        >
                            X
                        </button>

                    </div>

                </div>
            )}
        </>
    )
}