import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useState, useEffect } from 'react'
import { authFetch } from '../api/authFetch'

export default function RequireProfileComplete({ children }) {
    const { user, loading ,refreshUser }  = useAuth()
    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Chargement…
            </div>
        )
    }
    if (user.first_name &&
        user.last_name &&
        user.city &&
        user.date_of_birth &&
        user.file_path &&
        user.dogs?.dog_name &&
        user.dogs?.gender &&
        user.dogs?.breed &&
        user.dogs?.size &&
        user.dogs?.age
    )
        return children
    else
        return <Navigate to="/profile" replace/>
}