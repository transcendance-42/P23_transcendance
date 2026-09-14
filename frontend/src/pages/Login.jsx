import { Link } from 'react-router-dom'
import PrimaryButton from '../components/ui/PrimaryButton'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import Mascot from '../components/ui/Mascot'

export default function Login() {
    return (
        <div className="min-h-screen bg-surface-cream">
        <Modal>
            <Mascot index={0} size="lg"/>
            <ModalHeader title="Get Started" />
            <p className="text-xs text-text-caption text-center">
                By tapping Log In, you agree to our{' '}
                <span className="text-primary underline cursor-pointer">Terms</span>.
                    Learn how we process your data in our{' '}
                <span className="text-primary underline cursor-pointer">Privacy Policy</span>.
            </p>

            <Link to="/login/email" className="w-full flex items-center justify-center gap-3 border border-text-tertiary rounded-full py-3 hover:bg-surface-raised transition">
                ✉️ Log in with email
            </Link>

            <button disabled
                style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 1rem', border: '1px solid var(--color-surface-field)', color: 'var(--color-surface-white)' }}
                className="w-full flex items-center justify-center gap-3 opacity-40 cursor-not-allowed">
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
                Continue with Google
            </button>

            <PrimaryButton to="/register">🐶 Create an account</PrimaryButton>

            <p className="text-primary text-sm underline cursor-pointer">
                Trouble Logging In?
            </p>
        </Modal>
        </div>
    )
}
