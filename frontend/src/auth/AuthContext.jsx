import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiLogin, apiRefresh, apiLogout } from '../api/auth'
import { registerLogFunction, setFetchToken, authFetch } from '../api/authFetch'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [waitInSeconds, setWaitInSeconds] = useState(0)

    useEffect(() => {
        const boot = async () => {
            try {
                const { token, userId } = await apiRefresh()
                setToken(token)
                setFetchToken(token) // pour que la fonction authFetch ait aussi le token
                setUserId(userId)
            } catch(error) {
                if (error.status === 429) {
                    setWaitInSeconds(error.retryAfter)
                }
                setLoading(false)
            }
        }
        boot()
    }, [])    

    const refreshUser = useCallback( async () => {
        if (!userId)
            return
        try {
            const response = await authFetch(`/api/users/${userId}`)
            if (response.status === 401) // si le users n'est plus actif
            {
                await logout()
                return   
            }
            if (!response.ok) {
                return
            }
            const data = await response.json()
            setUser(data)
        }
        catch (e) {
            // silencieux
        }
        finally {
            setLoading(false)
        }
    }, [userId])

    const login = async (email, password) => {
        const {token, userId} = await apiLogin(email, password)
        setToken(token)
        setFetchToken(token) 
        setUserId(userId)
    }

    const logout = async () => {
        try {
            await apiLogout()
        }
        catch(e)
        {
            // silencieux
        }
        finally{
            setToken(null)
            setFetchToken(null) 
            setUserId(null)
        }
    }

    useEffect(() => {
        registerLogFunction({
            apiRefresh:apiRefresh,
            apiLogout:logout
        })
    }, [logout])

    useEffect( () => {
        if (!userId)
            return
        refreshUser()
    }, [refreshUser])

    return (
        <AuthContext.Provider value={{ token, userId, loading, login, logout, user, setUser, refreshUser, waitInSeconds }}>
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