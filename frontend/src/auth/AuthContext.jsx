import { createContext, useContext, useState, useEffect } from 'react'
import { apiLogin, apiRefresh } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const boot = async () => {
            try {
                const { token, userId } = await apiRefresh()
                setToken(token)
                setUserId(userId)
                localStorage.setItem('userId', userId)
            } catch (e) {
                console.error('boot refresh:', e)
            } finally {
                setLoading(false)
            }
        }
        boot()
    }, [])

    const login = async (email, password) => {
        const {token, userId} = await apiLogin(email, password)
        setToken(token)
        setUserId(userId)
        localStorage.setItem('userId', userId)
    }

    const logout = async () => {
        // await apiLogout()
        setToken(null)
        setUserId(null)
        localStorage.removeItem('userId')
    }

    return (
        <AuthContext.Provider value={{ token, userId, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) 
        throw new Error('useAuth doit être utilisé dans un AuthProvider')
    return ctx
}