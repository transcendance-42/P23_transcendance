import { useState } from 'react';
import { useNavigate } from 'react-router'

export default function LoginEmail ()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault() 
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password })}
        const response = await fetch('http://localhost:3000/api/auth/login', requestOptions)
        const data = await response.json()
        console.log(data)
        if (data.success) 
        {
            localStorage.setItem('userId', data.userId)
            navigate('/swipes')
        }
    }
    return (
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email..."
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password..."
                />
            <button type="submit">Login</button>
            </form>
    )
}