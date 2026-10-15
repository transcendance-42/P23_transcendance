import {motion, useMotionValue, useTransform } from 'framer-motion'
import {sendRequestSwipes} from '../../api/swipes'
import DogInfo from '../ui/DogInfo'
import Badge from '../ui/Badge'
import defaultDog from '../../assets/defaultPic.png'
import { useState, useEffect } from 'react'
import { authFetch } from '../../api/authFetch'

const DogCard = ({ dog, index, total, onSwipe, onMatch }) => {
    const x = useMotionValue(0)
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0])
    const rotateRaw = useTransform(x, [-150, 150], [-10, 10])
    const isFront = index === 0
    const [dogPics, setDogPics] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const rotate = useTransform(() => {
        const offset = isFront ? 0 : index % 2 ? 6 : -6;
        return `${rotateRaw.get() + offset}deg`;
    })

    const handleDragEnd = async () => {
        if (Math.abs(x.get()) > 50) {
            const direction = x.get() > 0 ? 'right' : 'left'
            try {
                const data = await sendRequestSwipes(direction, dog.id)
                console.log(data)
                if (data.matched) onMatch({
                    roomId: data.match?.id,
                    otherPicId: dog.dog_pics?.[0]?.id
                })
            } catch (e) {
                console.error('Swipe error:', e.message)
            }
            onSwipe()
        }
    }
    useEffect(() => {
        if (!dog.dog_pics?.length) return
        const cancelRef = { current: false }
        const createdUrls = []

        const loadPics = async () => {
            const sorted = [...dog.dog_pics].sort((a, b) => a.position - b.position)
            const urls = await Promise.all(
                sorted.map(async (pic) => {
                    const res = await authFetch(`/api/dog-pics/${pic.id}`)
                    const blob = await res.blob()
                    const url = URL.createObjectURL(blob)
                    createdUrls.push(url)
                    return url
                })
            )
            if (!cancelRef.current) setDogPics(urls)
        }

        loadPics()

        return () => {
            cancelRef.current = true
            createdUrls.forEach(u => URL.revokeObjectURL(u))
        }
    }, [dog.dog_pics])

    const likeOpacity = useTransform(x, [0, 100], [0, 0.4])
    const passOpacity = useTransform(x, [-100, 0], [0.4, 0])
    const likeOpacityBadge = useTransform(x, [0, 50], [0, 1])
    const passOpacityBadge = useTransform(x, [-50, 0], [1, 0])

    return (
        <motion.div
            className={`absolute w-[90vw] h-[70vh] sm:w-100 sm:h-150 bg-surface-raised border border-surface-mid rounded-[var(--radius-md)] shadow-card hover:cursor-grab active:cursor-grabbing select-none ${!isFront ? 'blur-[2px]' : ''}`}
            style={{ top: index * 8, left: index * 4, zIndex: total - index, x, opacity, rotate }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}>
            <motion.div style={{ opacity: likeOpacity }} className="absolute inset-0 bg-action-match rounded-[var(--radius-md)] z-10" />
            <motion.div style={{ opacity: passOpacity }} className="absolute inset-0 bg-action-pass rounded-[var(--radius-md)] z-10" />
            <Badge type="like" opacity={likeOpacityBadge} />
            <Badge type="pass" opacity={passOpacityBadge} />
            <div className="relative w-full h-80">
            <img src={dogPics[currentIndex] || defaultDog} alt={dog.dog_name} className="w-full h-full object-cover pointer-events-none rounded-[var(--radius-md)] mt-2 px-2" />
                {dogPics.length > 1 && (
                    <>
                        <button 
                            onPointerDown={e => { e.stopPropagation(); setCurrentIndex(i => Math.max(0, i - 1)) }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white rounded-full w-7 h-7 flex items-center justify-center"
                        >‹</button>
                        <button 
                            onPointerDown={e => { e.stopPropagation(); setCurrentIndex(i => Math.min(dogPics.length - 1, i + 1)) }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white rounded-full w-7 h-7 flex items-center justify-center"
                        >›</button>
                    </>
                )}
            </div>
            <DogInfo dog={dog} />
        </motion.div>
    )
}
export default DogCard