import NavBarAuth from '../components/ui/NavBarAuth';
import Footer from '../components/ui/Footer';
import { useTranslation } from 'react-i18next'
import defaultDog from '../assets/defaultPic.png';
import DogProfileCard from '../components/ui/DogProfileCard';
import {useNavigate, useParams} from 'react-router-dom';
import { useState, useEffect} from 'react';
import { authFetch } from '../api/authFetch';

export default function DogProfilePage(){
    const { t } = useTranslation()
    const navigate = useNavigate()
    const {id} = useParams()
    const [dog, setDog] = useState(null)
    useEffect(() => {
        authFetch(`/api/dogs/${id}`)
        .then(res => res.json())
        .then(data => setDog(data))
    }, [id])
    console.log(dog)

        return (
        <div className='min-h-screen bg-surface-cream flex flex-col'>
            <NavBarAuth />
            <div className='px-6 md:px-10 pt-6'>
                <button
                    className='inline-flex items-center gap-2 text-text-secondary hover:text-text-primary font-semibold transition hover:-translate-x-1'
                    onClick={() => navigate(-1)}>
                        <span className='text-xl'>←</span>
                            {t('Back')}
                </button>
            </div>
            <div className='mx-auto max-w-5xl px-6 py-10 flex-1 flex flex-col justify-center w-full'>
                {dog === null
                    ? <p className='text-center text-text-secondary'>{t('Loading')}</p>
                    : <DogProfileCard dog={dog}/>}
                </div>
        </div>
    )
}
