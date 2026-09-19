import { useNavigate } from 'react-router-dom'
import Modal from '../ui/Modal'
import ModalHeader from '../ui/ModalHeader'
import PrimaryButton from '../ui/PrimaryButton'
import defaultDog from '../../assets/defaultPic.png'
import { useTranslation } from 'react-i18next'

const MatchNotif = ({onClose}) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    
    return (
        <Modal onClose={onClose} width="w-full mx-4 sm:w-180" bg="bg-action-match/20">
            <ModalHeader title="It's a Match!!" />

            <div className="flex gap-2 p-4">
                <img src={defaultDog} alt="your dog" className="w-1/2 h-48 sm:h-80 object-cover rounded-[var(--radius-md)] border-6 border-action-match pointer-events-none"/>
                <img src={defaultDog} alt="other dog" className="w-1/2 h-48 sm:h-80 object-cover rounded-[var(--radius-md)] border-6 border-action-match pointer-events-none"/>
            </div>

            <PrimaryButton onClick={() => navigate('/roomlist')}>
                {t('StartChat')}
            </PrimaryButton>
        </Modal>
    )
}

export default MatchNotif