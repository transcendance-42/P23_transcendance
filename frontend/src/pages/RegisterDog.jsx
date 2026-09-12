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