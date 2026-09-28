import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function RequireAuth({ children }) {
    const { token, loading } = useAuth()
    if (loading)
        return <div className="min-h-screen flex items-center justify-center">Chargement…</div>
    if (!token)
        return <Navigate to="/login" replace />
    return children
}
