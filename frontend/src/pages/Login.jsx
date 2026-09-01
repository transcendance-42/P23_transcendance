import { Link } from 'react-router'
import PrimaryButton from '../components/ui/PrimaryButton'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'

export default function Login() {
    return (

        <Modal>
            <ModalHeader title="Get Started" />
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

            <PrimaryButton to="/register">🐶 Create an account</PrimaryButton>

            <p className="text-red-400 text-sm underline cursor-pointer">
                Trouble Logging In?
            </p>
        </Modal>
    )
}
