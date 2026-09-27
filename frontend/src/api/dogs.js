import { authFetch } from "./authFetch"

const fetchDogs = async () => {
    const response = await authFetch('/api/dogs')
    if (!response.ok)
        throw new Error('Failed to fetch dogs')
    return response.json()
}
export { fetchDogs }