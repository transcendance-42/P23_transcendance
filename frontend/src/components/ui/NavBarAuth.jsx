import { Link } from 'react-router-dom'

const NavBarAuth = () => (
    <nav className="w-full sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-neutral-800 text-grey">
        <span style={{ fontFamily: 'Bevan, serif' }} className="text-xl text-orange-400">
            Tindog
        </span>
        <div className="flex gap-6 text-sm">
            <Link to="/swipes" className="hover:text-orange-400 transition">Swipe</Link>
            <Link to="/matches" className="hover:text-orange-400 transition">Matches</Link>
            <Link to="/roomlist" className="hover:text-orange-400 transition">Chat</Link>
            <Link to="/profile" className="hover:text-orange-400 transition">Profile</Link>
        </div>
    </nav>
)
export default NavBarAuth