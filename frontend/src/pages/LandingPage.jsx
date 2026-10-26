import { useState, useEffect } from 'react'
import NavBar from '../components/ui/NavBar'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Testimonials from '../components/landing/Testimonials'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/ui/Footer'
import LoginPopup from '../components/login/LoginPopup'
import { useLocation } from 'react-router-dom'

export default function LandingPage() {
    const location = useLocation()
    const [showLogin, setShowLogin] = useState(!!location.state?.showLogin)

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