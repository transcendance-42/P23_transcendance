import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import InputField from '../components/ui/InputField'
import PrimaryButton from '../components/ui/PrimaryButton'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import Mascot from '../components/ui/Mascot'

export default function LoginEmail() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await login(email, password)
            navigate('/swipes')
        } catch (e) {
            console.error(e)
            setError(e.message)
        }
    }

    return (
        <div className="min-h-screen bg-surface-cream">
        <Modal>
            <Link to="/login" className="absolute top-4 right-4 text-text-caption hover:text-surface-white transition text-xl">✕</Link>
            <Mascot index={1} size="lg"/>
            <ModalHeader title="What's your email?" />
            <p className="text-xs text-text-caption text-center">
                Enter your email and password to log in.
            </p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                {error && <p className="text-action-pass text-xs text-center">{error}</p>}

                <PrimaryButton type="submit" disabled={!email || !password}>
                    Next
                </PrimaryButton>
            </form>
            <p className="text-text-caption text-sm">
                Don't have an account?{' '}
                <span onClick={() => navigate('/register')} className="text-primary underline cursor-pointer">Sign up</span>
            </p>
        </Modal>
    </div>
    )
}