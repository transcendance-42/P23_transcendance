import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"

const NavBar = () => (
    <nav className="w-full sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-neutral-800 text-gray-300">
        <span style={{ fontFamily: 'Bevan, serif' }} className="text-xl text-orange-400">
            Tindog
        </span>
        <div className="flex gap-4">
            <SecondaryButton to="/login">Log in</SecondaryButton>
            <PrimaryButton to="/register" fullWidth={false}>Sign up</PrimaryButton>
        </div>
    </nav>
)
export default NavBar