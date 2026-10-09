import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useState, useEffect } from 'react'

export default function RequireProfileComplete({ children }) {
    const { user, refreshUser }  = useAuth()
    if (!user) return null
    console.log('user.dogs:', user.dogs, 'dog_name:', user.dogs?.dog_name)
    if (user.first_name &&
        user.last_name &&
        user.city &&
        user.date_of_birth &&
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