import { useTranslation } from 'react-i18next';
import Mascot from './Mascot';
import defaultDog from '../../assets/defaultPic.png';

export default function DogProfileCard( {dog} ){
    const { t } = useTranslation()
    
    return(
        <div> { dog.dog_name }</div>

    )
}