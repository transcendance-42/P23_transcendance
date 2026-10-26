import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function RequireAdmin({ children }) {
    const { user } = useAuth()
    if (!user) return <Navigate to="/" state={{ showLogin: true }} replace />
    if (user.role !== 'admin') return <Navigate to="/profile" replace />
    return children
}
