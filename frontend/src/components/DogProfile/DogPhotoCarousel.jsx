import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../../api/authFetch'
import defaultDog from '../../assets/defaultPic.png'

export default function DogPhotoCarousel({ dog }) {
    const { t } = useTranslation()
    const [pics, setPics] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (!dog.dog_pics?.length) return
        const cancelRef = { current: false }
        const createdUrls = []

        const loadPics = async () => {
        const sorted = [...dog.dog_pics].sort((a, b) => a.position - b.position)
        const urls = []

        for (const pic of sorted) {
            if (cancelRef.current) return
        const res = await authFetch(`/api/dog-pics/${pic.id}`)
            if (!res.ok) continue
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        createdUrls.push(url)
        urls.push(url)
    }

    if (!cancelRef.current) setPics(urls)
    }
    loadPics().catch(() => {})

        return () => {
            cancelRef.current = true
            createdUrls.forEach(u => URL.revokeObjectURL(u))
        }
    }, [dog.dog_pics])

    return (
        <div className='md:w-1/2 relative rounded-[var(--radius-lg)] overflow-hidden shadow-floating'>
            <img className='w-full aspect-[4/5] object-cover' src={pics[currentIndex] || defaultDog} alt={dog.dog_name} />
            {pics.length > 1 && (
                <>
                    <button
                        onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center transition"
                    >‹</button>
                    <button
                        onClick={() => setCurrentIndex(i => Math.min(pics.length - 1, i + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center transition"
                    >›</button>
                </>
            )}
            <div className='absolute bottom-0 inset-x-0 bg-linear-to-t from-black/70 to-transparent p-6 flex items-baseline gap-2'>
                <span className='font-heading text-4xl font-bold text-white'>{dog.dog_name}</span>
                <span className='text-xl text-white'>{dog.age} {t('Years')}</span>
            </div>
        </div>
    )
}