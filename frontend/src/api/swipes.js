//pour le moment swiper_id et swiped_dog_id sont hardcoder mais à changer quand connecté à backend 
//console.log jsute pour tester en attendant de pouvoir tester avec backend
const sendRequestSwipes = async (direction) => {
    const requestOptions = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({direction, swiper_id: 1, target_id: 2 })
    }
    const response = await fetch('http://localhost:3000/api/swipes', requestOptions)
    const data = await response.json()
    console.log(data)
    return data
}
export { sendRequestSwipes }