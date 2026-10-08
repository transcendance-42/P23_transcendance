import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiLogin, apiRefresh, apiLogout } from '../api/auth'
import { registerLogFunction, setFetchToken, authFetch } from '../api/authFetch'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

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
            if (!response.ok) {
                return
            }
            const data = await response.json()
            setUser(data)
        }
        catch (e) {
            console.error('load user:', e)
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
            console.error(e.message)
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
        <AuthContext.Provider value={{ token, userId, loading, login, logout, user, setUser, refreshUser }}>
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