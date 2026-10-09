import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import ModalHeader from '../ui/ModalHeader'
import PrimaryButton from '../ui/PrimaryButton'
import defaultDog from '../../assets/defaultPic.png'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../../api/authFetch'

const MatchNotif = ({ onClose, myDogPics = [], otherDogPics = [] }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [myUrl, setMyUrl] = useState(null)
    const [otherUrl, setOtherUrl] = useState(null)

    useEffect(() => {
        const loadPic = async (pics, setUrl) => {
            const first = [...pics].sort((a, b) => a.position - b.position)[0]
            if (!first) return
            const res = await authFetch(`/api/dog-pics/${first.id}`)
            const blob = await res.blob()
            setUrl(URL.createObjectURL(blob))
        }
        loadPic(myDogPics, setMyUrl)
        loadPic(otherDogPics, setOtherUrl)
    }, [])

    return (
        <Modal onClose={onClose} width="w-full mx-4 sm:w-180" bg="bg-action-match/20">
            <ModalHeader title="It's a Match!!" />
            <div className="flex gap-2 p-4">
                <img src={myUrl || defaultDog} alt="your dog" className="w-1/2 h-48 sm:h-80 object-cover rounded-[var(--radius-md)] border-6 border-action-match pointer-events-none"/>
                <img src={otherUrl || defaultDog} alt="other dog" className="w-1/2 h-48 sm:h-80 object-cover rounded-[var(--radius-md)] border-6 border-action-match pointer-events-none"/>
            </div>
            <PrimaryButton onClick={() => navigate('/chat')}>
                {t('StartChat')}
            </PrimaryButton>
        </Modal>
    )
}

export default MatchNotif