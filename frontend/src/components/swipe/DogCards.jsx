import { useState, useEffect } from 'react'
import { fetchDogs } from '../../api/dogs'
import { sendRequestSwipes } from '../../api/swipes'
import DogCard from './DogCard'
import SwipeButton from '../ui/SwipeButton'
import EmptyState from '../ui/EmptyState'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../../api/authFetch'
import { useAuth } from '../../auth/AuthContext'


const DogCards = ({ onMatch }) => {
    const { t } = useTranslation()
    const [dogs, setDogs] = useState([])
    const { loading } = useAuth()

    useEffect(() => {
        fetchDogs()
            .then(data => setDogs(data))
            .catch(e => console.error(e))
    }, [])

    const removeCard = (id) => setDogs(dogs.filter(dog => dog.id !== id))

    const handleButtonSwipe = async (direction) => {
        const frontDog = dogs[0]
        try {
            const data = await sendRequestSwipes(direction, frontDog.id)
            if (data.matched) onMatch()
        } catch (e) {
            console.error('Swipe error:', e.message)
        }
        removeCard(frontDog.id)
    }

    if (dogs.length === 0)
        return <EmptyState title={t('NoMoreDog')} subtitle={t('ComeBack')}/>

    return (
        <div className="relative w-[90vw] h-[70vh] sm:w-100 sm:h-150">
            {dogs.slice(0, 5).map((dog, index) => (
                <DogCard
                    key={dog.id}
                    dog={dog}
                    index={index}
                    total={dogs.length}
                    onSwipe={() => removeCard(dog.id)}
                    onMatch={onMatch}
                />
            ))}

            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-8 z-50">
                <SwipeButton direction="left" onClick={() => handleButtonSwipe('left')} />
                <SwipeButton direction="right" onClick={() => handleButtonSwipe('right')} />
            </div>
        </div>
    )
}
export default DogCards