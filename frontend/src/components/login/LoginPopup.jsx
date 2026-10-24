import {useNavigate} from 'react-router-dom'
import Modal from '../ui/Modal'
import LoginChoice from './LoginChoice'

export default function LoginPopup({onClose}) {
    const navigate = useNavigate()

    return(
        <Modal onClose={onClose} bg='backdrop-blur-md bg-black/30'>
            <LoginChoice onEmail={() => navigate('/login/email')}/>
        </Modal>
    )
}