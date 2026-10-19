import NavBarAuth from '../components/ui/NavBarAuth';
import { useTranslation } from 'react-i18next'
import DogProfileCard from '../components/DogProfile/DogProfileCard';
import {useParams} from 'react-router-dom';
import { useState, useEffect} from 'react';
import { authFetch } from '../api/authFetch';
import Mascot from '../components/ui/Mascot';
import BackButton from '../components/ui/BackButton';

export default function DogProfilePage(){
    const { t } = useTranslation()
    const {id} = useParams()
    const [dog, setDog] = useState(null)

    useEffect(() => {
        authFetch(`/api/dogs/${id}`)
        .then(res => {
            if (!res.ok) throw new Error()
            return res.json()
        })
        .then(data => setDog(data))
        .catch(() => setDog({ error: true }))
    }, [id])

    let content = <p className='text-center text-text-secondary'>{t('Loading')}</p>
    if (dog?.error)
    {
        content =
        (
            <div className='flex flex-col items-center gap-3'>
                <Mascot index={2} size='md'/>
                <p className='text-center text-text-secondary'>{t('DogNotFound')}</p>
            </div>
        )
    }
    else if (dog)
    {
        content = <DogProfileCard dog={dog}/>
    }

    return (
        <div className='min-h-screen bg-surface-cream flex flex-col'>
            <NavBarAuth />
            <div className='px-6 md:px-10 pt-6'>
                 <BackButton />
            </div>
            <div className='mx-auto max-w-5xl px-6 py-10 flex-1 flex flex-col justify-center w-full'>
               {content}
            </div>
        </div>
    )
}
