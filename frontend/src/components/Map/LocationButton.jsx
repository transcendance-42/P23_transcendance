import { useState } from 'react'
import MapModal from './MapModal'
import { useTranslation } from 'react-i18next'

// on prend ici le prop de register, juste pour le donner au MapModal
export default function LocationButton({ onLocationChange }) {
    const { t } = useTranslation()
    const [showMap, setShowMap] = useState(false)
	const [location, setLocation] = useState('')
	const handleLocationChange = (city, latitude, longitude, radius) => {
		setLocation(city)
		onLocationChange(city, latitude, longitude, radius)
	}
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
                    {location || t('LocalisationButton')}
                </span>
            </button>
			{/* show  map pour ouvrir et fernmer la map avec une condition type bool */}
            {showMap && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-xl overflow-hidden pt-12">
                        <button
                            type="button"
                            onClick={() => setShowMap(false)}
                            className="absolute top-2 right-2 z-50 bg-red-300 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl shadow-md hover:bg-red-400"
                        >
                            X
                        </button>
                        <MapModal
                            onLocationChange={handleLocationChange}
                            onClose={() => setShowMap(false)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}