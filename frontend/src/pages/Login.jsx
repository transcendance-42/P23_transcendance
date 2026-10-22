import {useNavigate} from 'react-router-dom'
import Modal from '../components/ui/Modal'
import LoginChoice from '../components/login/LoginChoice'


export default function Login() {
    const navigate = useNavigate()
    
    return(
        <div className='min-h-screen bg-surface-cream'>
            <Modal showBack={true}>
                <LoginChoice onEmail={() => navigate('/login/email')}/>
            </Modal>
        </div>
    )

    
}
