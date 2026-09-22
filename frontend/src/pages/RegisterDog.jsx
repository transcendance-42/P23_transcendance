import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import InputField from '../components/ui/InputField'
import PrimaryButton from '../components/ui/PrimaryButton'
import Mascot from '../components/ui/Mascot'
import SelectField from '../components/ui/SelectField'
import calculateAge from '../utils/calculateAge'

export default function RegisterDog() {
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
            <Modal>
                <Mascot index={5} size="lg"/>
                <ModalHeader title="Create dog profile" />
                <p className="text-primary text-xs text-center">Don't worry, you can update your dog's profile anytime</p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <InputField placeholder="Name" value={formData.dog_name} onChange={handleChange('dog_name')} />
                    <InputField placeholder="Breed" value={formData.breed} onChange={handleChange('breed')} />
                    <SelectField value={formData.gender} onChange={handleChange('gender')}>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </SelectField>
                    <InputField type="date" placeholder="Date of birth" value={formData.date_of_birth} onChange={handleChange('date_of_birth')} />
                    <SelectField value={formData.size} onChange={handleChange('size')}>
                        <option value="">Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </SelectField>
                    <InputField placeholder="Bio" value={formData.bio} onChange={handleChange('bio')} />

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
                        Create profile
                    </PrimaryButton>
                </form>
            </Modal>
        </div>
    )
}