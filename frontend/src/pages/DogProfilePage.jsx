import NavBarAuth from '../components/ui/NavBarAuth';
import Footer from '../components/ui/Footer';
import DogInfo from '../components/ui/DogInfo';
import { useTranslation } from 'react-i18next'
import { useState } from 'react';

    const Fakedog = {
    id: '1', 
    dog_name: 'Laylow', 
    breed: 'Staffy',
    age: 3,
    gender: 'Male', 
    size: 'Small', 
    bio: 'Gentille toutou qui aime les balades',
    dog_pics: [],
    users: {first_name: 'Jul', city: 'Annecy'}
    }

export default function DogProfilePage(){
    const { t } = useTranslation()

        return (
        <div>
            <NavBarAuth />
            <p>{Fakedog.dog_name}</p>
        </div>
    )
}

