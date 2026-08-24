import { Link } from 'react-router'

export default function Login() {
    return (
        <div className="min-h-screen bg-orange-100 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="bg-neutral-900 rounded-2xl p-8 w-96 flex flex-col items-center gap-4 text-white">
                    <span className="text-4xl">🐾</span>
                    <h2 style={{ fontFamily: 'Bevan, serif' }} className="text-3xl">
                        Get Started
                    </h2>
                    
                    <p className="text-xs text-gray-400 text-center">
                        By tapping Log In, you agree to our{' '}
                        <span className="text-red-400 underline cursor-pointer">Terms</span>.
                        Learn how we process your data in our{' '}
                        <span className="text-red-400 underline cursor-pointer">Privacy Policy</span>.
                    </p>

                    <Link to="/login/email" className="w-full flex items-center justify-center gap-3 border border-gray-600 rounded-full py-3 hover:bg-neutral-800 transition">
                        ✉️ Log in with email
                    </Link>

                    
                    <button disabled
                        style={{ borderRadius: 'var(--radius-full)', padding: 'var(--space-md) var(--space-xl)', border: '1px solid var(--color-surface-field)', color: 'var(--color-surface-white)' }}
                        className="w-full flex items-center justify-center gap-3 opacity-40 cursor-not-allowed">
                        <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
                        Continue with Google
                    </button>

                    <Link to="/register" className="w-full flex items-center justify-center gap-3 bg-orange-500 rounded-full py-3 hover:bg-orange-700 transition font-semibold">
                        🐶 Create an account
                    </Link>

                    <p className="text-red-400 text-sm underline cursor-pointer">
                        Trouble Logging In?
                    </p>
                </div>
            </div>
        </div>
    )
}
