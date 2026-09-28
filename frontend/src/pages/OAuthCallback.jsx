import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OAuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('access_token')
        const userId = params.get('userId')
        if (token && userId) {
            localStorage.setItem('access_token', token)
            localStorage.setItem('userId', userId)
            navigate('/swipes')
        } else {
            navigate('/login')
        }
    }, [])

    return <p>Connexion en cours...</p>
}