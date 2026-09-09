import { useState } from 'react'
import SecondaryButton from './SecondaryButton'

const NavBarAuth = () => {
    const [open, setOpen] = useState(false)
    return (
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4">
            <div className="flex items-center justify-between">
                <span className="text-xl text-primary font-heading">Tindog</span>
                <button className="sm:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
                <div className="hidden sm:flex gap-6 text-sm">
                    <SecondaryButton to="/swipes">Swipes</SecondaryButton>
                    <SecondaryButton to="/matches">Matches</SecondaryButton>
                    <SecondaryButton to="/roomlist">Chat</SecondaryButton>
                    <SecondaryButton to="/profile">Profile</SecondaryButton>
                </div>
            </div>
            {open && (
                <div className="sm:hidden flex flex-col gap-3 mt-4">
                    <SecondaryButton to="/swipes">Swipes</SecondaryButton>
                    <SecondaryButton to="/matches">Matches</SecondaryButton>
                    <SecondaryButton to="/roomlist">Chat</SecondaryButton>
                    <SecondaryButton to="/profile">Profile</SecondaryButton>
                </div>
            )}
        </nav>
    )
}
export default NavBarAuth