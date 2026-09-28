import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function OAuthCallback() {
    const navigate = useNavigate()
    const { loginWithToken } = useAuth()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('access_token')
        const userId = params.get('userId')
        const profileComplete = params.get('profileComplete')
        if (token && userId) {
            loginWithToken(token, userId)
            navigate(profileComplete === 'true' ? '/swipes' : '/registerDog')
        } else {
            navigate('/login')
        }
    }, [])

    return <p>Connexion en cours...</p>
}