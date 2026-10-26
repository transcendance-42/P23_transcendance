import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useTranslation } from 'react-i18next'

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

// Déplace la carte lorsque les coordonnées changent
function MapController({ position }) {
    const map = useMap()
    useEffect(() => {
        if (position)
            map.setView(position, 10)
    }, [map, position])
    return null
}

// component de la map qui permet l'affichage en donnant le props de register
export default function MapModal({ onLocationChange, onClose }) {
    const { t } = useTranslation()
    const [search, setSearch] = useState('')
    const [position, setPosition] = useState([46.5197, 6.6323])
    const [error, setError] = useState('')
    const [radius, setRadius] = useState('')
    const [city, setCity] = useState('')
    const [hasSearch, setHasSearch] = useState(false)
    const isValid = hasSearch && city && radius >= 1 // pour rendre le bouton non cliquable

    const handleSearch = async () => {
        if (!search.trim())
            return
        try {
            setError('')
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&featuretype=city&q=${encodeURIComponent(search)}`
            )
            if (!response.ok)
                throw new Error(t('RequestError'))
            const results = await response.json()
            if (results.length === 0) {
                setError(t('ErrorCityNotFound'))
                return
            }
            const address = results[0].address
            const newCity = address.city || address.town || address.village || address.municipality
            const newPosition = [parseFloat(results[0].lat), parseFloat(results[0].lon)]
            setCity(newCity)
            setPosition(newPosition)
            setHasSearch(true)
        } catch (error) {
            console.error(error)
            setError(t('CatchMapError'))
        }
    }

    const handleValidate = () => {
        if (!city) {
            setError(t('EmptySearch'))
            return
        }
        if (!Number.isInteger(radius) || radius < 1 || radius > 500) {
            setError(t('EmplyRadius'))
            return
        }
		onLocationChange(city, radius)
        onClose()
    }

    return (
        <div className="bg-white rounded-lg p-4">
            <h1 className="absolute top-5 left-5 text-[20px] font-semibold text-black">
                {t('MapTitle')}
            </h1>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter')
                            handleSearch()
                    }}
                    placeholder={t('SearchACity')}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg"
                >
                    {t('SearchMap')}
                </button>
            </div>
            {error && (
                <p className="text-red-500 mb-3">
                    {error}
                </p>
            )}
            <MapContainer
                center={position}
                zoom={10}
                style={{ width: '400px', height: '400px' }}
                scrollWheelZoom={true}
                dragging={true}
                doubleClickZoom={false}
                touchZoom={true}
                keyboard={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController position={position}/>
                {hasSearch && (< 
                    Marker
                    position={position}
                    icon={defaultIcon}
                />)}
                {hasSearch && (<
                        Circle
                        center={position}
                        radius={radius * 1000}
                        pathOptions={{
                            color: 'red',
                            fillColor: 'red',
                            fillOpacity: 0.10
                        }}
                    />
                )}
            </MapContainer>
            <div className="mt-4 flex flex-col items-start gap-2">
                <p className="text-sm text-gray-600">
                    {t('SearchDistanceMessage')}
                </p>

                <div className="flex items-center gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min="1"
                            placeholder={t('DistanceToSearch')}
                            onChange={(e) => setRadius(Number(e.target.value))}
                            className="w-auto border border-gray-300 rounded-lg px-4 py-2 text-black"
                        />
                        <span className="text-black">km</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleValidate}
                        className="ml-auto text-white px-4 py-2 rounded-lg transition-all duration-100 bg-green-500 hover:bg-green-600 cursor-pointer"
                    >
                        {t('ValideMapData')}
                    </button>
                </div>
            </div>
        </div>
    )
}
