import DogCard from '../components/DogCard'
import MatchNotif from '../components/MatchNotif'
import {useState} from 'react';

//pour l'instant à chaque swipe on a un match vu quon a hardcoer les valeurs evidemments à modifier quand lier avec le backend
function SwipePage() {
const [showMatch, setShowMatch] = useState(false)
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#4a4540' }}>
        <DogCard onMatch={() => setShowMatch(true)} />
        {showMatch && <MatchNotif onClose={() => setShowMatch(false)}/>}
    </div>
  )
}

export default SwipePage