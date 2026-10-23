import { useTranslation } from 'react-i18next'
import DogPhotoCarousel from './DogPhotoCarousel'
import DogOwnerCard from './DogOwnerCard'
import SendMessageButton from './SendMessageButton'
import DogDocument from '../Profile/DogDocument'

export default function DogProfileCard({ dog }) {
    const { t } = useTranslation()

    return (
        <div className='flex flex-col md:flex-row gap-12 md:items-center'>
            <DogPhotoCarousel dog={dog} />

            <div className='flex flex-col md:w-1/2 gap-6'>
                <div className='flex flex-wrap gap-3'>
                    <span className='bg-surface-white rounded-full px-4 py-2 shadow-soft text-text-primary font-semibold'>{dog.breed}</span>
                    <span className='bg-surface-white rounded-full px-4 py-2 shadow-soft text-text-primary font-semibold'>{t(dog.size)}</span>
                    <span className='bg-surface-white rounded-full px-4 py-2 shadow-soft text-text-primary font-semibold'>{t(dog.gender)}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-heading text-2xl font-bold text-text-primary'>{t('AboutMe')}</h2>
                    <p className='text-text-secondary leading-relaxed'>{dog.bio}</p>
                </div>
                <DogOwnerCard ownerId={dog.owner_id} />
                <DogDocument dogId={dog.id} editable={false} />
                <SendMessageButton dogId={dog.id} />
            </div>
        </div>
    )
}