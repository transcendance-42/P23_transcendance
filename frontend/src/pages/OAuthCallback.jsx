import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function OAuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const profileComplete = params.get('profileComplete')
        navigate(profileComplete === 'true' ? '/swipes' : '/profile')
    }, [])

    return <p>Connexion en cours...</p>
}