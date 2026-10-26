import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import InputField from '../components/ui/InputField'
import PrimaryButton from '../components/ui/PrimaryButton'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import Mascot from '../components/ui/Mascot'
import { useTranslation } from 'react-i18next'
import LangSwitcher from '../components/ui/LangSwitcher'

export default function LoginEmail() {
    const { t } = useTranslation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [emailTouched, setEmailTouched] = useState(false)
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await login(email, password)
            navigate('/swipes')
        } catch (e) {
            setError(t('ErrLoginFailed'))
        }
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const emailError = emailTouched && !emailValid ? t('ErrEmailInvalid') : null

    return (
        <div className="min-h-screen bg-surface-cream">
        <Modal showBack={true} >
            <div className="flex gap-4 self-end">
                <LangSwitcher />
            </div>
            <Mascot index={1} size="lg"/>
            <ModalHeader title={t('WhatEmail')}/>
            <p className="text-xs text-text-caption text-center">
                {t('Login8')}
            </p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)} error={emailError}
                    placeholder={t('EnterEmail')}
                />
                <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('EnterPassword')} />
                {error && <p className="text-action-pass text-xs text-center">{error}</p>}

                <PrimaryButton type="submit" disabled={!emailValid || !password}>
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