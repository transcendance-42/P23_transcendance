import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputField from '../components/ui/InputField'
import PrimaryButton from '../components/ui/PrimaryButton'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import Mascot from '../components/ui/Mascot'
import { useTranslation } from 'react-i18next'

export default function LoginEmail() {
    const { t } = useTranslation()
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
        <div className="min-h-screen bg-surface-cream">
        <Modal>
            <Link to="/login" className="absolute top-4 right-4 text-text-caption hover:text-surface-white transition text-xl">✕</Link>
            <Mascot index={1} size="lg"/>
            <ModalHeader title="What's your email?" />
            <p className="text-xs text-text-caption text-center">
                {t('Login8')}
            </p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('EnterEmail')} />
                <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('EnterPassword')} />
                {error && <p className="text-action-pass text-xs text-center">{error}</p>}

                <PrimaryButton type="submit" disabled={!email || !password}>
                    {t('Next')}
                </PrimaryButton>
            </form>
            <p className="text-text-caption text-sm">
                {t('Login9')}{' '}
                <span onClick={() => navigate('/register')} className="text-primary underline cursor-pointer">{t('SignUp')}</span>
            </p>
        </Modal>
    </div>
    )
}