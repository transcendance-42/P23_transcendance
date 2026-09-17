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
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleChange = (field) => (e) =>
        setFormData({ ...formData, [field]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        const { date_of_birth, ...rest } = formData
        const body = { ...rest, age: calculateAge(date_of_birth) }
        console.log('body envoyé:', body)
        try {
            const response = await fetch('/api/dogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ owner_id: localStorage.getItem('userId'), ...body })
            })
            const data = await response.json()
            if (response.ok) {
                setSuccess('Profile created!')
                setTimeout(() => navigate('/swipes'), 1500)
            } else {
                setError(data.error || 'Server error')
            }
        } catch (e) {
            setError('Server unreachable, please try again')
        }
    }
    const allFilled = Object.values(formData).every(v => v !== '')

    return (
        <div className="min-h-screen bg-surface-cream">
            <Modal>
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