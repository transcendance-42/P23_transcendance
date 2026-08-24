import { useState } from 'react'
import { useNavigate, Link } from 'react-router'

export default function LoginEmail() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (data.success) {
                localStorage.setItem('userId', data.userId)
                navigate('/swipes')
            } else {
                setError(data.error || 'Login failed')
            }
        } catch (e) {
            setError('Server error, please try again')
        }
    }

    return (
        <div className="min-h-screen bg-orange-100 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="bg-neutral-900 rounded-2xl p-8 w-96 flex flex-col items-center gap-6 text-white relative">

                    <Link to="/login" className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-xl">✕</Link>

                    <span className="text-4xl">🐾</span>

                    <h2 style={{ fontFamily: 'Bevan, serif' }} className="text-3xl">
                        What's your email?
                    </h2>

                    <p className="text-xs text-gray-400 text-center">
                        Enter your email and password to log in.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full bg-transparent border border-blue-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                        />

                        {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                        <button type="submit"
                            className="w-full rounded-full py-3 font-semibold transition mt-4"
                            style={{ backgroundColor: email && password ? '#D96C4D' : '#3a3a3a', color: email && password ? 'white' : '#888', cursor: email && password ? 'pointer' : 'not-allowed' }}>
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}