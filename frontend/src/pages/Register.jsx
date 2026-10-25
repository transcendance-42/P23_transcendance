import { useState, useEffect } from 'react'
import { authFetch } from '../api/authFetch'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import InputField from '../components/ui/InputField'
import PrimaryButton from '../components/ui/PrimaryButton'
import Mascot from '../components/ui/Mascot'
import { useTranslation } from 'react-i18next'
import Avatar from '../components/ui/Avatar'
import LocationButton from '../components/Map/LocationButton'
import { validateImage } from '../utils/validateImage'

const getErrors = (data, avatarFile) => {
    const errors = {}

    const first = data.first_name.trim()
    if (!first) errors.first_name = 'ErrRequired'
    else if (first.length < 3 || first.length > 20) errors.first_name = 'ErrNameLength'

    const last = data.last_name.trim()
    if (!last) errors.last_name = 'ErrRequired'
    else if (last.length < 3 || last.length > 20) errors.last_name = 'ErrNameLength'

    if (!data.email) errors.email = 'ErrRequired'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'ErrEmailInvalid'

    if (data.password.length < 8) errors.password = 'ErrPasswordShort'
    else if (data.password.length > 20) errors.password = 'ErrPasswordLong'

    if (!data.confirm_password) errors.confirm_password = 'ErrRequired'
    else if (data.confirm_password !== data.password) errors.confirm_password = 'ErrPasswordMatch'

    if (!data.date_of_birth) errors.date_of_birth = 'ErrRequired'
    else {
        const birth = new Date(data.date_of_birth)
        const today = new Date()
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()))
            age--
        if (birth.getFullYear() < 1900) errors.date_of_birth = 'ErrTooOld'
        else if (age < 18) errors.date_of_birth = 'ErrTooYoung'
    }

    if (!data.city || data.radius === '') errors.location = 'ErrRequired'
    if (!avatarFile) errors.avatar = 'ErrRequired'

    return errors
}

export default function Register() {

    const { t } = useTranslation()
    const navigate = useNavigate()
    const { login, userId } = useAuth()

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        city: '',
        radius: '',
        date_of_birth: ''
    })
    const [touched, setTouched] = useState({})
    const [avatarFile, setAvatarFile] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [pendingAvatarFile, setPendingAvatarFile] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (!userId || !pendingAvatarFile) return
        const fd = new FormData()
        fd.append('file', pendingAvatarFile)
        authFetch(`/api/user/${userId}/pic`, { method: 'PUT', body: fd })
            .then(r => {
                if (!r.ok) setError(t('ErrAvatarUpload'))
                setPendingAvatarFile(null)
            })
            .catch(() => setError(t('ErrAvatarUpload')))
    }, [userId, pendingAvatarFile])

    const handleChange = (field) => (e) =>
        setFormData({ ...formData, [field]: e.target.value })

    const handleBlur = (field) => () =>
        setTouched(prev => ({ ...prev, [field]: true }))

    const handleAvatarUpload = (file) => {
        const err = validateImage(file, t)
        if (err) { setError(err); return }
        setAvatarFile(file)
        setAvatarUrl(URL.createObjectURL(file))
    }

    const handleLocationChange = (city, radius) => {
        setFormData(prev => ({
            ...prev,
            city,
            radius
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const { confirm_password, ...body } = formData
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        let data = {}

        if (response.status !== 204) {
            data = await response.json()
        }

        if (response.status === 400) return setError(t('ErrInvalidData'))
        if (response.status === 401) {
            if (data.error === 'TOO_YOUNG') return setError(t('ErrTooYoung'))
            if (data.error === 'TOO_OLD') return setError(t('ErrTooOld'))
        }
        if (response.status === 409) return setError(t('ErrEmailExists'))

        if (response.ok) {
            setSuccess(t('AccountCreated'))
            await login(formData.email, formData.password)
            if (avatarFile) setPendingAvatarFile(avatarFile)
            setTimeout(() => navigate('/registerDog'), 1500)
        } else {
            setError(t('ErrServer'))
        }
    }

    const errors = getErrors(formData, avatarFile)
    const isValid = Object.keys(errors).length === 0
    const hasStarted = Object.keys(touched).length > 0
    const fieldError = (field) =>
        touched[field] && errors[field] ? t(errors[field]) : null

    return (
        <div className="min-h-screen bg-surface-cream">
            <Modal showBack={true}>
                <ModalHeader title={t('CreateAccount')} />
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                    <div className="flex flex-col items-center gap-2 w-full">
                        <Avatar size='lg' url={avatarUrl} onUpload={handleAvatarUpload} />
                        {hasStarted && errors.avatar ? (
                            <p className="text-sm text-action-pass">{t('ErrPhotoRequired')}</p>
                        ) : (
                            <p className="text-sm text-text-caption">
                                {avatarUrl ? t('ChangePhoto') : t('AddPhoto')}
                            </p>
                        )}
                    </div>

                    <InputField id="First_name" label={t('FirstName')} placeholder={t('FirstName')}
                        value={formData.first_name} onChange={handleChange('first_name')}
                        onBlur={handleBlur('first_name')} error={fieldError('first_name')} />

                    <InputField id="LastName" label={t('LastName')} placeholder={t('LastName')}
                        value={formData.last_name} onChange={handleChange('last_name')}
                        onBlur={handleBlur('last_name')} error={fieldError('last_name')} />

                    <InputField id="Email" label={t('Email')} type="email" placeholder="email@gmail.com"
                        value={formData.email} onChange={handleChange('email')}
                        onBlur={handleBlur('email')} error={fieldError('email')} />

                    <InputField id="Password" label={t('Password')} type="password" placeholder={t('Password')}
                        value={formData.password} onChange={handleChange('password')}
                        onBlur={handleBlur('password')} error={fieldError('password')} />

                    <InputField id="confirm_password" label={t('ConfirmPassword')} type="password" placeholder={t('ConfirmPassword')}
                        value={formData.confirm_password} onChange={handleChange('confirm_password')}
                        onBlur={handleBlur('confirm_password')} error={fieldError('confirm_password')} />

                    <InputField id="date_of_birth" label={t('DateOfBirth')} type="date" placeholder={t('DateOfBirth')}
                        value={formData.date_of_birth} onChange={handleChange('date_of_birth')}
                        onBlur={handleBlur('date_of_birth')} error={fieldError('date_of_birth')} />

                    <LocationButton dark={true} onLocationChange={handleLocationChange} />
                    {hasStarted && errors.location && (<p className="text-xs text-action-pass">{t('ErrLocationRequired')}</p>)}

                    {error && <p className="text-action-pass text-xs text-center">{error}</p>}
                    {success && <p className="text-action-match text-xs text-center">{success}</p>}

                    <PrimaryButton type="submit" disabled={!isValid}>
                        {t('CreateAccount')}
                    </PrimaryButton>
                    {!isValid && (<p className="text-text-caption text-xs text-center">{t('CompleteForm')}</p>)}
                </form>

                <Mascot index={4} size="lg" />
                <p onClick={() => navigate('/')} className="text-primary text-sm underline cursor-pointer">
                    {t('AlreadyAccount')}
                </p>
            </Modal>
        </div>
    )
}