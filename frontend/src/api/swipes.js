
const sendRequestSwipes = async (direction) => {
    const swiperId = localStorage.getItem('userId')
    const response = await fetch('/api/swipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction, swiper_id: Number(swiperId), target_id: targetId })
    })
    const data = await response.json()
    if (!response.ok)
        throw new Error(data.error || 'Swipe failed')
    return data
}
export { sendRequestSwipes }