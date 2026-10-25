import { useState } from 'react'
import NavBar from '../components/ui/NavBar'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Testimonials from '../components/landing/Testimonials'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/ui/Footer'
import LoginPopup from '../components/login/LoginPopup'

export default function LandingPage() {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <div>
            <NavBar onShowLogin={() => setShowLogin(true)} />
            <Hero />
            <HowItWorks/>
            <Testimonials/>
            <FinalCTA onShowLogin={() => setShowLogin(true)} />
            <Footer/>
            {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
        </div>
    )
}