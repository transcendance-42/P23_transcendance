import { useTranslation } from 'react-i18next';
import Mascot from './Mascot';
import defaultDog from '../../assets/defaultPic.png';
import DogInfo from './DogInfo';

export default function DogProfileCard( {dog} ){
    const { t } = useTranslation()
    
    return(
        <div className='flex flex-col md:flex-row gap-12 md:items-center'>
            <div className='md:w-1/2 relative rounded-[var(--radius-lg)] overflow-hidden shadow-floating'>
            {/* Need un UseState pour changer les photos quand je les receverais du back */}
                <img className='w-full aspect-[4/5] object-cover' src={defaultDog} alt={dog.dog_name}/>
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
                </div>
            </div>
        </div>
    )
}