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
import { authFetch, getToken } from '../api/authFetch'
import { useAuth } from '../auth/AuthContext'
import { uploadDogPics } from '../api/dogs'

const getErrors = (data, photos) => {
    const errors = {}

    if (!data.dog_name.trim()) errors.dog_name = 'ErrRequired'
    else if (data.dog_name.trim().length < 2) errors.dog_name = 'ErrDogNameShort'
    else if (data.dog_name.length > 50) errors.dog_name = 'ErrDogNameLong'

    if (!data.breed.trim()) errors.breed = 'ErrRequired'
    else if (data.breed.length > 30) errors.breed = 'ErrBreedLong'

    if (!data.gender) errors.gender = 'ErrRequired'

    if (!data.date_of_birth) errors.date_of_birth = 'ErrRequired'
    else {
        const birth = new Date(data.date_of_birth)
        const today = new Date()
        if (birth > today) errors.date_of_birth = 'ErrDateFuture'
        else if (today.getFullYear() - birth.getFullYear() > 30) errors.date_of_birth = 'ErrDogTooOld'
    }

    if (!data.size) errors.size = 'ErrRequired'

    if (!data.bio.trim()) errors.bio = 'ErrRequired'
    else if (data.bio.length > 400) errors.bio = 'ErrBioLong'

    if (photos.length === 0) errors.photos = 'ErrPhotoRequired'

    return errors
}

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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(null)
    const [uploadIndex, setUploadIndex] = useState(0)
    const { refreshUser } = useAuth()
    const [touched, setTouched] = useState({})
    const [photoError, setPhotoError] = useState('')

    const handleChange = (field) => (e) =>
        setFormData({ ...formData, [field]: e.target.value })

    const handleBlur = (field) => () =>
        setTouched(prev => ({ ...prev, [field]: true }))

    const handlePhoto = (e) => {
    const files = Array.from(e.target.files)
    const MAX_SIZE = 5 * 1024 * 1024

    for (const file of files) {
        if (file.size > MAX_SIZE)
        {
            setPhotoError(t('ErrPhotoTooLarge', { name: file.name }))
            return
        }
        if (photos.some(p => p.name === file.name && p.size === file.size))
        {
            setPhotoError(t('ErrPhotoDuplicate', { name: file.name }))
            return
        }
    }
    setPhotoError('')
    setPhotos(prev => [...prev, ...files].slice(0, 5))
    }

    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)
        const { date_of_birth, ...rest } = formData
        const body = { ...rest, age: calculateAge(date_of_birth) }
        try {
            const dogRes = await authFetch('/api/dogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const dogData = await dogRes.json()
            if (!dogRes.ok) {
            if (dogData.error === 'DOG_ALREADY_EXISTS') setError(t('ErrDogExists'))
            else if (dogData.error === 'VALIIDATION_ERROR') setError(t('ErrInvalidData'))
            else setError(t('ErrServer'))
            setIsSubmitting(false)
            return
        }
            // Étape 2 : créer les photos pour le chien, multipart
            for (let index = 0; index < photos.length; index++) {
                const fd = new FormData()
                fd.append('dog_id', dogData.id)
                fd.append('file', photos[index])
                fd.append('position', index + 1)
                setUploadIndex(index + 1)
                setUploadProgress(0)
                try {
                    await uploadDogPics(fd, getToken(), setUploadProgress)
                } catch {
                    setError(t('UploadFailed', { name: photos[index].name }))
                    await refreshUser()
                    setTimeout(() => navigate('/profile'), 1500)
                    return
                } finally {
                    setUploadProgress(null)
                }
            }
            await refreshUser()
            setSuccess(t('DogCreated'))
            setTimeout(() => navigate('/swipes'), 1500)
        } catch {
            setError(t('ErrServer'))
            setIsSubmitting(false)
        }
    }

    const errors = getErrors(formData, photos)
    const isValid = Object.keys(errors).length === 0
    const fieldError = (field) =>
        touched[field] && errors[field] ? t(errors[field]) : null

    return (
        <div className="min-h-screen bg-surface-cream">
            <Modal onClose={() => navigate(-1)} showBack={true} >
                <Mascot index={5} size="lg"/>
                <ModalHeader title={t('CreateDog')} />
                <p className="text-primary text-xs text-center">{t('Register1')}</p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <InputField id="dog_name" label={t('Name')} placeholder={t('Name')} value={formData.dog_name}
                        onChange={handleChange('dog_name')} onBlur={handleBlur('dog_name')} error={fieldError('dog_name')} />
                    <InputField id="breed" label={t('Breed')} placeholder={t('Breed')} value={formData.breed}
                        onChange={handleChange('breed')} onBlur={handleBlur('breed')} error={fieldError('breed')} />
                    <SelectField id="gender" label={t('Gender')} value={formData.gender}
                        onChange={handleChange('gender')} onBlur={handleBlur('gender')} error={fieldError('gender')}>
                        <option value="">{t('Gender')}</option>
                        <option value="Male">{t('Male')}</option>
                        <option value="Female">{t('Female')}</option>
                        <option value="Other">{t('Other')}</option>
                    </SelectField>
                    <InputField id="date_of_birth" label={t('DateOfBirth')} type="date" value={formData.date_of_birth}
                        onChange={handleChange('date_of_birth')} onBlur={handleBlur('date_of_birth')} error={fieldError('date_of_birth')} />
                    <SelectField id="size" label={t('Size')} value={formData.size}
                        onChange={handleChange('size')} onBlur={handleBlur('size')} error={fieldError('size')}>
                        <option value="">{t('Size')}</option>
                        <option value="Small">{t('Small')}</option>
                        <option value="Medium">{t('Medium')}</option>
                        <option value="Large">{t('Large')}</option>
                    </SelectField>
                    <InputField id="bio" label={t('Bio')} placeholder={t('Bio')} value={formData.bio}
                        onChange={handleChange('bio')} onBlur={handleBlur('bio')} error={fieldError('bio')} />

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
                        {photoError && (
                            <p className="text-action-pass text-xs text-center">{photoError}</p>
                        )}
                        {!photoError && errors.photos && (
                            <p className="text-text-caption text-xs text-center">{t(errors.photos)}</p>
                    )}
                    
                    {uploadProgress !== null && (
                        <div className="w-full flex flex-col gap-1">
                            <p className="text-xs text-center text-text-caption">
                                {t('UploadingPhoto', { current: uploadIndex, total: photos.length })} — {uploadProgress}%
                            </p>
                            <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={uploadProgress}
                                 className="h-1 w-full bg-surface-mid rounded-full overflow-hidden">
                                <div className="h-full bg-primary transition-all duration-200"
                                     style={{ width: `${uploadProgress}%` }} />
                            </div>
                        </div>
                    )}

                    {error && <p className="text-action-pass text-xs text-center">{error}</p>}
                    {success && <p className="text-action-match text-xs text-center">{success}</p>}

                    <PrimaryButton type="submit" disabled={!isValid || isSubmitting}>
                        {t('Profile2')}
                    </PrimaryButton>
                </form>
            </Modal>
        </div>
    )
}