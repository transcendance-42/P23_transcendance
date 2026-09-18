import { authFetch } from "./authFetch"

const sendRequestSwipes = async (direction, targetId) => {
    // const swiperId = localStorage.getItem('userId')
    const response = await authFetch('/api/swipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction, target_id: targetId })
    })
    const data = await response.json()
    if (!response.ok)
        throw new Error(data.error || 'Swipe failed')
    return data
}
export { sendRequestSwipes }