import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import InputField from '../components/ui/InputField'
import PrimaryButton from '../components/ui/PrimaryButton'
import Mascot from '../components/ui/Mascot'
import SelectField from '../components/ui/SelectField'
import calculateAge from '../utils/calculateAge'
import { useTranslation } from 'react-i18next'
import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'
import { authFetch } from '../api/authFetch'
import { useAuth } from '../auth/AuthContext'


export default function RegisterDog() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        dog_name: '',
        breed: '',
        gender: '',
        date_of_birth: '',
        size: '',
        bio: '',
    })
    const [photos, setPhotos] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleChange = (field) => (e) =>
        setFormData({ ...formData, [field]: e.target.value })

    const handlePhoto = (e) => {
    const files = Array.from(e.target.files)
    const MAX_SIZE = 5 * 1024 * 1024

    for (const file of files) {
        if (file.size > MAX_SIZE)
        {
            setError(`${file.name} is too large — please choose a file under 5MB`)
            return
        }
        if (photos.some(p => p.name === file.name && p.size === file.size))
        {
            setError(`${file.name} is already uploaded`)
            return
        }
    }
    setError('')
    setPhotos(prev => [...prev, ...files].slice(0, 5))
    }

    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const { date_of_birth, ...rest } = formData
        const body = { ...rest, age: calculateAge(date_of_birth) }
        try {
            // const formDataToSend = new FormData()
            // Object.entries({ owner_id: localStorage.getItem('userId'), ...body }).forEach(([k, v]) => formDataToSend.append(k, v))
            // photos.forEach(photo => formDataToSend.append('photos', photo))
           
            // Étape 1 : créer le chien (JSON pur, pas de fichiers)
            const dogRes = await fetch('/api/dogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const dogData = await dogRes.json()
            if (!dogRes.ok)
                setError(dogData.error || 'Server error')
            // Étape 2 : créer les photos pour le chien, multipart
            for (const photo of photos) {
                const fd = new FormData()
                fd.append('dog_id', dogData.id)
                fd.append('file', photo)
                const picDogRes = await fetch('/api/dog-pics', { method: 'POST', body: fd })
                if (!picDogRes.ok) {
                    setError(`Échec de l'upload de ${photo.name}`)
                    return
                }
            }
            setSuccess('Profile created!')
            setTimeout(() => navigate('/swipes'), 1500)
        } catch (e) {
            setError('Server unreachable, please try again')
        }
    }

    const allFilled = Object.values(formData).every(v => v !== '') && photos.length > 0

    return (
        <div className="min-h-screen bg-surface-cream">
            <Modal onClose={() => navigate(-1)}>
                <Mascot index={5} size="lg"/>
                <ModalHeader title={t('CreateDog')} />
                <p className="text-primary text-xs text-center">{t('Register1')}</p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <InputField placeholder={t('Name')} value={formData.dog_name} onChange={handleChange('dog_name')} />
                    <InputField placeholder={t('Breed')} value={formData.breed} onChange={handleChange('breed')} />
                    <SelectField value={formData.gender} onChange={handleChange('gender')}>
                        <option value="">{t('Gender')}</option>
                        <option value="Male">{t('Male')}</option>
                        <option value="Female">{t('Female')}</option>
                        <option value="Other">{t('Other')}</option>
                    </SelectField>
                    <InputField type="date" placeholder={t('DateOfBirth')} value={formData.date_of_birth} onChange={handleChange('date_of_birth')} />
                    <SelectField value={formData.size} onChange={handleChange('size')}>
                        <option value="">{t('Size')}</option>
                        <option value={t('Small')}>{t('Small')}</option>
                        <option value={t('Medium')}>{t('Medium')}</option>
                        <option value={t('Large')}>{t('Large')}</option>
                    </SelectField>
                    <InputField placeholder={t('Bio')} value={formData.bio} onChange={handleChange('bio')} />

                    <div className="grid grid-cols-3 gap-2">
                        {photos.map((photo, i) => (
                            <div key={i} className="relative">
                                <img src={URL.createObjectURL(photo)} 
                                    className="w-full h-24 object-cover rounded-[var(--radius-sm)] bg-surface-cream" />
                                <button type="button" onClick={() => removePhoto(i)}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    ✕
                                </button>
                            </div>
                        ))}
                        {photos.length < 5 && (
                            <label className="h-24 border border-dashed border-text-tertiary rounded-[var(--radius-sm)] flex items-center justify-center text-text-caption cursor-pointer text-2xl">
                                +
                                <input type="file" accept="image/*" multiple onChange={handlePhoto} className="hidden" />
                            </label>
                        )}
                    </div>
                    {photos.length === 0 && (
                        <p className="text-text-caption text-xs text-center">At least 1 photo required</p>
                    )}

                    {error && <p className="text-action-pass text-xs text-center">{error}</p>}
                    {success && <p className="text-action-match text-xs text-center">{success}</p>}

                    <PrimaryButton type="submit" disabled={!allFilled}>
                        {t('Profile2')}
                    </PrimaryButton>
                </form>
            </Modal>
        </div>
    )
}