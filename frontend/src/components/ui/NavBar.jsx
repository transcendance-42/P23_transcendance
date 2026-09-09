import { useState } from 'react'
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"

const NavBar = () => {
    const [open, setOpen] = useState(false)
    return (
        <nav className="w-full sticky top-0 z-50 bg-surface-raised text-surface-white px-6 py-4">
            <div className="flex items-center justify-between">
                <span className="text-xl text-primary font-heading">PawMatch</span>
                <button className="sm:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
                <div className="hidden sm:flex gap-4">
                    <SecondaryButton to="/login">Log in</SecondaryButton>
                    <PrimaryButton to="/register" fullWidth={false}>Sign up</PrimaryButton>
                </div>
            </div>
            {open && (
                <div className="sm:hidden flex flex-col gap-3 mt-4">
                    <SecondaryButton to="/login">Log in</SecondaryButton>
                    <PrimaryButton to="/register">Sign up</PrimaryButton>
                </div>
            )}
        </nav>
    )
}
export default NavBar