import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(-1)}
                    className='md:hidden bg-primary hover:bg-primary-hover text-surface-white rounded-md px-3 py-2 text-sm font-semibold transition'
                >
                    {t('Back')}
    </button>
    )
}

export default BackButton