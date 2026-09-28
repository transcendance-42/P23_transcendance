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
                console.log('LE USERID APRES REFRESH DU TOKEN:')
                console.log(userId)
                setToken(token)
                setFetchToken(token) // pour que la fonction authFetch ait aussi le token
                setUserId(userId)
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
        setFetchToken(token) 
        setUserId(userId)
    }

    const loginWithToken = (token, userId) => {
        setToken(token)
        setFetchToken(token)
        setUserId(userId)
    }

    const logout = async () => {
        // await apiLogout()
        setToken(null)
        setFetchToken(null) 
        setUserId(null)
    }

    useEffect(() => {
        registerLogFunction({
            apiRefresh:apiRefresh,
            apiLogout:logout
        })
    }, [logout])

    return (
        <AuthContext.Provider value={{ token, userId, loading, login, loginWithToken, logout }}>
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