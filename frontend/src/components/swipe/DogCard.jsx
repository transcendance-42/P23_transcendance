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
    const [dogPic, setDogPic] = useState(null)
    
    const rotate = useTransform(() => {
        const offset = isFront ? 0 : index % 2 ? 6 : -6;
        return `${rotateRaw.get() + offset}deg`;
    })

    const handleDragEnd = async () => {
        if (Math.abs(x.get()) > 50) {
            const direction = x.get() > 0 ? 'right' : 'left'
            try {
                const data = await sendRequestSwipes(direction, dog.id)
                if (data.matched) onMatch()
            } catch (e) {
                console.error('Swipe error:', e.message)
            }
            onSwipe()
        }
    }
    useEffect(() => {
        let pic = null
        for (let i = 0; i < dog.dog_pics.length; i++)
        {
            if (Number(dog.dog_pics[i].position) === 1)
                pic = dog.dog_pics[i]
        }
        if (!pic)
            return
        let cancel = false
        let objectUrl = null
        const loadPic = async () =>{
            const data = await authFetch(`/api/dog-pics/${pic.id}`)
            const blob = await data.blob()
            if (cancel)
                return
            objectUrl = URL.createObjectURL(blob)
            setDogPic(objectUrl)
        }
        loadPic()
        return () => {
            cancel = true
            if (objectUrl)
                URL.revokeObjectURL(objectUrl)
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
            <img src={dogPic || defaultDog} alt={dog.dog_name} className="w-full h-80 object-cover pointer-events-none rounded-[var(--radius-md)] mt-2 px-2" />
            <DogInfo dog={dog} />
        </motion.div>
    )
}
export default DogCard