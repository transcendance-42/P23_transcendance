import NavBar from '../components/ui/NavBar'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Testimonials from '../components/landing/Testimonials'
import FinalCTA from '../components/landing/FinalCTA'

export default function LandingPage() {
    return (
        <div> 
            <NavBar/>
            <Hero/>
            <HowItWorks/>
            <Testimonials/>
            <FinalCTA/>
        </div>
    )
}
