import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import ModalHeader from '../ui/ModalHeader'
import PrimaryButton from '../ui/PrimaryButton'
import SecondaryButton from '../ui/SecondaryButton'

export default function ReactivateModal({ user, onConfirm, onClose }) {
    const { t } = useTranslation()
    if (!user) return null

    return (
        <Modal onClose={onClose} width="w-full mx-4 sm:w-96" bg="backdrop-blur-md bg-black/30">
            <ModalHeader title={t('ReactivateUser')} />
            <p className="text-text-caption text-sm text-center">
                {t('ReactivateUserConfirm', { name: `${user.first_name} ${user.last_name}` })}
            </p>
            <div className="flex gap-3 w-full mt-2">
                <SecondaryButton onClick={onClose}>{t('Cancel')}</SecondaryButton>
                <PrimaryButton onClick={onConfirm}>{t('Reactivate')}</PrimaryButton>
            </div>
        </Modal>
    )
}