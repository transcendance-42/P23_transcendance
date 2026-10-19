import { useState, useEffect } from 'react'
import { fetchDogs } from '../../api/dogs'
import { sendRequestSwipes } from '../../api/swipes'
import DogProfileCard from '../DogProfile/DogProfileCard'
import SwipeButton from '../ui/SwipeButton'
import EmptyState from '../ui/EmptyState'
import Mascot from '../ui/Mascot'
import Badge from '../ui/Badge'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const DogCards = ({ onMatch }) => {
    const { t } = useTranslation()
    const [dogs, setDogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [swipeDir, setSwipeDir] = useState(null)

    useEffect(() => {
        fetchDogs()
            .then(data => setDogs(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const handleSwipe = async (direction) => {
        setSwipeDir(direction)
        const frontDog = dogs[0]
        try {
            const data = await sendRequestSwipes(direction, frontDog.id)
            if (data.matched) onMatch({
                roomId: data.match?.id,
                myPicId: data.myDog?.dog_pics?.[0]?.id,
                otherPicId: frontDog.dog_pics?.[0]?.id,
                otherDogId: frontDog.id
            })
        } catch (e) {
            console.error('Swipe error:', e.message)
        }
        setTimeout(() => {
            setSwipeDir(null)
            setDogs(prev => prev.filter(d => d.id !== frontDog.id))
        }, 600)
    }

    if (loading) return <p className="text-center text-text-secondary">{t('Loading')}</p>

    if (error) return (
        <div className="flex flex-col items-center gap-3">
            <Mascot index={2} size="md" />
            <p className="text-center text-text-secondary">{t('ErrorLoadingMessages')}</p>
        </div>
    )

    if (dogs.length === 0) return <EmptyState title={t('NoMoreDog')} subtitle={t('ComeBack')} />

    return (
        <div className="mx-auto max-w-5xl px-6 py-10 flex-1 flex flex-col justify-center w-full gap-8">
            <div className="relative">
                <AnimatePresence>
                    {swipeDir && (
                        <motion.div
                            key={swipeDir}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute inset-0 rounded-[var(--radius-md)] z-10 pointer-events-none ${
                                swipeDir === 'right' ? 'bg-action-match' : 'bg-action-pass'
                            }`}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {swipeDir && (
                        <motion.div
                            key={`badge-${swipeDir}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-20"
                        >
                            <Badge type={swipeDir === 'right' ? 'like' : 'pass'} opacity={1} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <DogProfileCard dog={dogs[0]} />
            </div>
            <div className="flex justify-center gap-8">
                <SwipeButton direction="left" onClick={() => handleSwipe('left')} />
                <SwipeButton direction="right" onClick={() => handleSwipe('right')} />
            </div>
        </div>
    )
}

export default DogCards