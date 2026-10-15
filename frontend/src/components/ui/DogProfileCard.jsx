import { useTranslation } from 'react-i18next';
import Mascot from './Mascot';
import defaultDog from '../../assets/defaultPic.png';
import PrimaryButton from './PrimaryButton';
import {useState, useEffect } from 'react';
import { authFetch } from '../../api/authFetch';

export default function DogProfileCard( {dog} ){
    const { t } = useTranslation()
    const [pics, setPics] = useState([])

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
            if (!cancelRef.current) setPics(urls)
        }

        loadPics()

        return () => {
            cancelRef.current = true
            createdUrls.forEach(u => URL.revokeObjectURL(u))
        }
    }, [dog.dog_pics])
    
    return(
        <div className='flex flex-col md:flex-row gap-12 md:items-center'>
            <div className='md:w-1/2 relative rounded-[var(--radius-lg)] overflow-hidden shadow-floating'>
                <img className='w-full aspect-[4/5] object-cover' src={pics[0] || defaultDog} alt={dog.dog_name}/>
                <div className='absolute bottom-0 inset-x-0 bg-linear-to-t from-black/70 to-transparent p-6 
                    flex items-baseline gap-2'>
                    <span className='font-heading text-4xl font-bold text-white'>{dog.dog_name}</span>
                    <span className='text-xl text-white'>{dog.age} {t('Years')}</span>
                </div>
            </div>
                
            <div className='flex flex-col md:w-1/2 gap-6'>
                <div className='flex flex-wrap gap-3'>
                    <span className='bg-surface-white rounded-full px-4 py-2 shadow-soft text-text-primary font-semibold'>{dog.breed}</span> 
                    <span className='bg-surface-white rounded-full px-4 py-2 shadow-soft text-text-primary font-semibold'>{t(dog.size)}</span> 
                    <span className='bg-surface-white rounded-full px-4 py-2 shadow-soft text-text-primary font-semibold'>{t(dog.gender)}</span> 
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-heading text-2xl font-bold text-text-primary'>{t('AboutMe')} </h2>
                    <p className='text-text-secondary leading-relaxed'>{dog.bio} </p>
                </div>
                <div className='bg-surface-raised rounded-[var(--radius-md)] p-5 flex items-center gap-4'>
                    <div className='w-16 h-16 rounded-full overflow-hidden bg-surface-cream flex items-center justify-center'>
                        <Mascot size='sm'/>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xs uppercase tracking-widest text-text-caption'>{t('HisHuman')}</span>
                        <span className='font-heading text-xl text-surface-white'>{dog.users?.first_name}</span> 
                        <span className='text-sm text-surface-cream'>{dog.users?.city}</span>
                    </div>
                </div>
                <PrimaryButton>
                    <span className='font-heading'>{t('SendMessage')}</span>
                </PrimaryButton>
            </div>
        </div>
    )
}