import { createContext, useContext, useState, useEffect } from 'react'
import { apiLogin, apiRefresh } from '../api/auth'
import { registerLogFunction, setFetchToken } from '../api/authFetch'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const boot = async () => {
            try {
                const { token, userId } = await apiRefresh()
                console.log('LE TOKEN APRES REFRESH CEST CA')
                console.log(token)
                setToken(token)
                setFetchToken(token) // pour que la fonction authFetch ait aussi le token
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

    useEffect(() => {
        registerLogFunction({
            apiRefresh:apiRefresh,
            apiLogout:logout
        })
    }, [logout])

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