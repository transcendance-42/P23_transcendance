import { Link } from 'react-router-dom'

const NavBar = () => (
    <nav className="w-full sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-neutral-800 text-grey">
        <span style={{ fontFamily: 'Bevan, serif' }} className="text-xl text-orange-400">
            Tindog
        </span>
        <div className="flex gap-4">
            <Link to="/login" className="border border-gray-600 rounded-full px-4 py-2 text-sm hover:bg-neutral-800 transition">
                Log in
            </Link>
            <Link to="/register" className="rounded-full px-4 py-2 text-sm font-semibold transition"
                style={{ backgroundColor: '#D96C4D' }}>
                Sign up
            </Link>
        </div>
    </nav>
)
export default NavBar