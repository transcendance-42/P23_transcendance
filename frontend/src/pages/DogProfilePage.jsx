import NavBarAuth from '../components/ui/NavBarAuth';
import Footer from '../components/ui/Footer';
import { useTranslation } from 'react-i18next'
import defaultDog from '../assets/defaultPic.png';
import DogProfileCard from '../components/ui/DogProfileCard';

    const Fakedog = {
        id: '1', 
        dog_name: 'Laylow', 
        breed: 'Staffy',
        age: 3,
        gender: 'Male', 
        size: 'Small', 
        bio: 'Gentil toutou qui aime les balades',
        dog_pics: [],
        users: {first_name: 'Jul', city: 'Annecy'}
    }

export default function DogProfilePage(){
    const { t } = useTranslation()

        return (
        <div className='min-h-screen bg-surface-cream'>
            <NavBarAuth />
            <div className='mx-auto max-w-5xl px-6 py-10'>
                 <DogProfileCard dog={Fakedog}/>
                </div>
        </div>
    )
}
