import { Link } from 'react-router-dom'
import Mascot from "./Mascot"

const Footer = () => (
    <footer className="w-full bg-surface-raised text-text-caption text-xs">
        <div className="max-w-4xl mx-auto px-8 py-10 flex gap-8">
        <Mascot index={2} size="md" />
        <div className="flex flex-col items-center gap-6 flex-1">
            <span className="text-xl text-primary font-heading">Tindog</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link to="/privacy" className="hover:text-surface-white transition">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-surface-white transition">Terms of Service</Link>
                <Link to="/safety" className="hover:text-surface-white transition">Safety Tips</Link>
                <Link to="/contact" className="hover:text-surface-white transition">Contact Us</Link>
            </div>
            <p>© 2026 Tindog. All rights reserved.</p>
        </div>
    </div>
    </footer>
)
export default Footer