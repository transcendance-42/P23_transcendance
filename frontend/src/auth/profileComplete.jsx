import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useState, useEffect } from 'react'
import { authFetch } from '../api/authFetch'

export default function RequireProfileComplete({ children }) {
    const { user }  = useAuth()
    console.log('user.dogs:', user.dogs, 'dog_name:', user.dogs?.dog_name)
    if (user.first_name &&
        user.last_name &&
        user.city &&
        user.date_of_birth &&
        user.dogs?.[0]?.dog_name &&
        user.dogs?.[0]?.gender &&
        user.dogs?.[0]?.breed &&
        user.dogs?.[0]?.size &&
        user.dogs?.[0]?.age
    )
        return children
    else
        return <Navigate to="/profile" replace/>
}