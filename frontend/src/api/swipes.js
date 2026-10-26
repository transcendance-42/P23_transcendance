import { authFetch } from "./authFetch"

const sendRequestSwipes = async (direction, targetId) => {
    const response = await authFetch('/api/swipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction, target_id: targetId })
    })
    const data = await response.json()
    if (!response.ok) {
        const error = new Error(data.error || 'Swipe failed')
        error.status = response.status
        throw error
    }
    return data
}
export { sendRequestSwipes }