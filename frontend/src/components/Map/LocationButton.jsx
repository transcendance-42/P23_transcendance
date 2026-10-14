import { useState, useEffect } from 'react'
import MapModal from './MapModal'
import { useTranslation } from 'react-i18next'

export default function LocationButton({ onLocationChange, initialCity = '', initialRadius = '', dark = false }) {
    const { t } = useTranslation()
    const [showMap, setShowMap] = useState(false)
    const [location, setLocation] = useState(initialCity)
    const [radius, setRadius] = useState(initialRadius)

    useEffect(() => {
        setLocation(initialCity)
        setRadius(initialRadius)
    }, [initialCity, initialRadius])

    const handleLocationChange = (city, latitude, longitude, rad) => {
        setLocation(city)
        setRadius(rad)
        onLocationChange(city, latitude, longitude, rad)
    }

    const textColor = dark ? 'text-white border-white' : 'text-text-primary border-text-tertiary'
    const iconBorder = dark ? 'border-white' : 'border-text-tertiary'

    return (
        <>
            <button
                type="button"
                onClick={() => setShowMap(true)}
                className={`w-full bg-transparent border rounded-lg px-4 py-3 flex items-center gap-3 ${textColor}`}
            >
                <span className={`w-7 h-7 rounded-full border flex items-center justify-center ${iconBorder}`}>
                    🌍
                </span>
                <span>
                    {location ? `${location}${radius ? ` (${radius} km)` : ''}` : t('LocalisationButton')}
                </span>
            </button>
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