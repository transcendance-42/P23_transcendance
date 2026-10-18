import DogCards from '../components/swipe/DogCards'
import MatchNotif from '../components/swipe/MatchNotif'
import {useState} from 'react';
import NavBarAuth from '../components/ui/NavBarAuth'

function SwipePage() {
    const [matchData, setMatchData] = useState(null)
    return (
        <div>
            <div className="relative z-50">
                <NavBarAuth />
            </div>
            <div className="min-h-screen flex items-start justify-center pt-16 bg-surface-cream">
                <DogCards onMatch={(data) => setMatchData(data)} />
    {matchData && (
        <MatchNotif
            onClose={() => setMatchData(null)}
            roomId={matchData.roomId}
            myPicId={matchData.myPicId}
            otherPicId={matchData.otherPicId}
            otherDogId={matchData.otherDogId}
        />
    )}
            </div>
        </div>
    )
    }

export default SwipePage