import { AppError } from '../error.js'

async function validate_geo_data(city) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&featuretype=city&q=${encodeURIComponent(city)}`, {
    headers: {'User-Agent': 'Tindog/1.0.0'}})
    if (!response.ok) {
        console.error('Nominatim status:', response.status)
        console.error('Nominatim response:', await response.text())
        throw new AppError(502, 'GEOCODING_ERROR', 'Unable to verify city')
    }
    const results = await response.json()
    if (results.length === 0)
        throw new AppError(400, 'INVALID_CITY', 'Invalid city')
    return {
        latitude: Number(results[0].lat),
        longitude: Number(results[0].lon)
    }
}

export { validate_geo_data }