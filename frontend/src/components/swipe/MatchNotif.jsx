import userPhoto from '../../assets/surf.jpg'
import matchPhoto from '../../assets/joya.jpg'
import { useNavigate } from 'react-router'
import Modal from '../ui/Modal'
import ModalHeader from '../ui/ModalHeader'
import PrimaryButton from '../ui/PrimaryButton'

const MatchNotif = ({onClose}) => {
    const navigate = useNavigate()
    
    return (
        <Modal onClose={onClose} width="w-180" bgColor="bg-pink-400">
            <ModalHeader title="It's a Match!!" />

            <div className="flex gap-2 p-4">
                <img src={userPhoto} alt="your dog" className="w-1/2 h-80 object-cover rounded-2xl border-6 border-pink-400 pointer-events-none"/>
                <img src={matchPhoto} alt="other dog" className="w-1/2 h-80 object-cover rounded-2xl border-6 border-pink-400 pointer-events-none"/>
            </div>

            <PrimaryButton onClick={() => navigate('/chat/1')}>
                Start chatting ...
            </PrimaryButton>
        </Modal>
    )
}

export default MatchNotif