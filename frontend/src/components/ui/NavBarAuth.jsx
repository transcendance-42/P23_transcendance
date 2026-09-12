import SecondaryButton from './SecondaryButton'

const NavBarAuth = () => (
    <nav className="w-full sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-neutral-800 text-gray-1300">
        <span style={{ fontFamily: 'Bevan, serif' }} className="text-xl text-orange-400">
            Tindog
        </span>
        <div className="flex gap-6 text-sm">
            <SecondaryButton to="/swipes">Swipes</SecondaryButton>
            <SecondaryButton to="/matches">Matches</SecondaryButton>
            <SecondaryButton to="/chat">Chat</SecondaryButton>
            <SecondaryButton to="/profile">Profile</SecondaryButton>
        </div>
    </nav>
)
export default NavBarAuth