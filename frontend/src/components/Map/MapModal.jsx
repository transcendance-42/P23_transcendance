import { useState } from 'react'
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
    if (position)
        map.setView(position, 10)
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

    const handleSearch = async () => {
        if (!search.trim())
            return
        try {
            setError('')
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(search)}`
            )
            if (!response.ok)
                throw new Error('Erreur lors de la recherche')
            const results = await response.json()
            if (results.length === 0) {
                setError('Ville introuvable')
                return
            }
            const address = results[0].address
            const newCity = address.city || address.town || address.village || address.municipality
            const newPosition = [parseFloat(results[0].lat), parseFloat(results[0].lon)]
            setCity(newCity)
            setPosition(newPosition)
            console.log('Ville :', newCity)
            console.log('position :', newPosition)
        } catch (error) {
            console.error(error)
            setError('Impossible de chercher cette ville')
        }
    }

    const handleValidate = () => {
        if (!Number.isInteger(radius) || radius < 1 || radius > 500) {
            setError('le rayon doit être compris entre 1 et 500km')
            return
        }
        console.log('radius :', radius)
		onLocationChange(city, position[0], position[1], radius)
        onClose()
    }

    return (
        <div className="bg-white rounded-lg p-4">
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
                dragging={false}
                doubleClickZoom={true}
                touchZoom={true}
                keyboard={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController position={position}/>
                <Marker
                    position={position}
                    icon={defaultIcon}
                />
                <Circle
                    center={position}
                    radius={radius * 1000}
                    pathOptions={{
                        color: 'red',
                        fillColor: 'red',
                        fillOpacity: 0.10
                    }}
                />
            </MapContainer>
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        min="1"
                        placeholder={t('DistanceToSearch')}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="w-auto border border-gray-300 rounded-lg px-4 py-2 text-black"
                    />
                    <span className="text-black"> km </span>
                </div>
                <button
                    type="button"
                    onClick={handleValidate}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    {t('ValideMapData')}
                </button>
            </div>
        </div>
    )
}
