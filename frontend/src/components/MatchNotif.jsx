import react from 'react'
import userPhoto from '../assets/surf.jpg'
import matchPhoto from '../assets/joya.jpg'
import { useNavigate } from 'react-router-dom'

//pour l'instant on envoie que sur le chat de 1 mais il faudrait relier ca une fois que la partie chat est develop
const MatchNotif = ({onClose}) => {
    const navigate = useNavigate()
    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className='relative h-120 w-180 bg-pink-400 rounded-2xl'>
                <button onClick={onClose} className="absolute top-3 right-3 text-white text-2xl font-bold z-10 hover:text-pink-800 transition-colors">
                    ✕
                </button>
                <h1 
                    style={{ fontFamily: 'Bevan, serif' }}
                    className="text-5xl text-pink-300 text-center mt-4 drop-shadow-md"
                >
                    It's a Match!
                </h1>
                <div className="flex gap-2 p-4">
                    <img src={userPhoto} alt="your dog" className='w-1/2 h-80 object-cover rounded-2xl border-6 border-pink-400'/>
                    <img src={matchPhoto} alt="other dog" className='w-1/2 h-80 object-cover rounded-2xl border-6 border-pink-400'/>
                </div>
                <div className='w-full flex justify-center'>
                    <button onClick={() => navigate('/chat/1')} className="bg-pink-200 text-pink-500 font-bold px-6 py-2 rounded-full hover:text-pink-800 transition-colors">
                        Start chatting ...
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MatchNotif