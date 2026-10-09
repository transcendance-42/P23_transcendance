import { useTranslation } from 'react-i18next';
import Mascot from './Mascot';
import defaultDog from '../../assets/defaultPic.png';
import DogInfo from './DogInfo';

export default function DogProfileCard( {dog} ){
    const { t } = useTranslation()
    
    return(
        <div className='flex flex-col md:flex-row gap-12 md:items-center'>
            <div className='md:w-1/2 relative rounded-[var(--radius-lg)] overflow-hidden shadow-floating'>
                <img className='w-full aspect-[4/5] object-cover' src={defaultDog} alt={dog.dog_name} x/>
            </div>
            <div className='md:w-1/2'> infos </div>
        </div>

    )
}