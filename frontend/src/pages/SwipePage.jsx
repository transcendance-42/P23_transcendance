import DogCard from '../components/swipe/DogCard'
import MatchNotif from '../components/swipe/MatchNotif'
import {useState} from 'react';

function SwipePage() {
const [showMatch, setShowMatch] = useState(false)
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <DogCard onMatch={() => setShowMatch(true)} />
        {showMatch && <MatchNotif onClose={() => setShowMatch(false)}/>}
    </div>
  )
}

export default SwipePage