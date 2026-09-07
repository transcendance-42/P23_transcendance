import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputField from '../components/ui/InputField'
import PrimaryButton from '../components/ui/PrimaryButton'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'

export default function LoginEmail() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (data.success) {
                localStorage.setItem('userId', data.userId)
                navigate('/swipes')
            } else {
                setError(data.error || 'Login failed')
            }
        } catch (e) {
            setError('Server error, please try again')
        }
    }

    return (
        <Modal>
            <Link to="/login" className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-xl">✕</Link>
            <ModalHeader title="What's your email?" />
            <p className="text-xs text-gray-400 text-center">
                Enter your email and password to log in.
            </p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                <PrimaryButton type="submit" disabled={!email || !password}>
                    Next
                </PrimaryButton>
            </form>
        </Modal>
    )
}