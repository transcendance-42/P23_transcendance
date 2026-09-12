import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import InputField from '../components/ui/InputField'
import PrimaryButton from '../components/ui/PrimaryButton'
import Mascot from '../components/ui/Mascot'


export default function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        city: '',
        date_of_birth: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleChange = (field) => (e) =>
        setFormData({ ...formData, [field]: e.target.value })

    const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirm_password)
        return setError('Passwords do not match')
    if (formData.password.length < 8)
        return setError('Password must be at least 8 characters')

    const { confirm_password, ...body } = formData
    console.log('TODO: POST /api/auth/register', body)
    // en attente: brancher quand la route backend POST /api/auth/register existe
    // const response = await fetch('/api/auth/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body)
    // })
    // const data = await response.json()
    // if (response.status === 400) return setError('Invalid data')
    // if (response.status === 409) return setError('Email already exists')
    // if (response.ok) {
    //     setSuccess('Account created!')
    //     setTimeout(() => navigate('/registerDog'), 1500)
    // } else {
    //     setError('Server error, please try again')
    // }
}
    const allFilled = Object.values(formData).every(v => v !== '')

    return (
        <div className="min-h-screen bg-surface-cream">
            <Modal>
                <Mascot index={4} size="lg"/>
                <ModalHeader title="Create account" />
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <InputField placeholder="First name" value={formData.first_name} onChange={handleChange('first_name')} />
                    <InputField placeholder="Last name" value={formData.last_name} onChange={handleChange('last_name')} />
                    <InputField type="email" placeholder="Email" value={formData.email} onChange={handleChange('email')} />
                    <InputField type="password" placeholder="Password" value={formData.password} onChange={handleChange('password')} />
                    <InputField type="password" placeholder="Confirm password" value={formData.confirm_password} onChange={handleChange('confirm_password')} />
                    <InputField placeholder="City" value={formData.city} onChange={handleChange('city')} />
                    <InputField type="date" placeholder="Date of birth" value={formData.date_of_birth} onChange={handleChange('date_of_birth')} />

                    {error && <p className="text-action-pass text-xs text-center">{error}</p>}
                    {success && <p className="text-action-match text-xs text-center">{success}</p>}

                    <PrimaryButton type="submit" disabled={!allFilled}>
                        Create account
                    </PrimaryButton>
                </form>
                <p onClick={() => navigate('/login')} className="text-action-pass text-sm underline cursor-pointer">
                    Already have an account?
                </p>
            </Modal>
        </div>
    )
}