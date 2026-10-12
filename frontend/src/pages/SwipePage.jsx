import DogCards from '../components/swipe/DogCards'
import MatchNotif from '../components/swipe/MatchNotif'
import {useState} from 'react';
import NavBarAuth from '../components/ui/NavBarAuth'

function SwipePage() {
const [showMatch, setShowMatch] = useState(false)
  return (
    <div>
        <div className="relative z-50">
            <NavBarAuth />
        </div>
        <div className="min-h-screen flex items-start justify-center pt-16 bg-surface-cream">
            <DogCards onMatch={() => setShowMatch(true)} />
            {showMatch && <MatchNotif onClose={() => setShowMatch(false)}/>}
        </div>
    </div>
)
}

export default SwipePage