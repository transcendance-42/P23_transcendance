import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { authFetch } from '../../api/authFetch'
import { useAuth } from '../../auth/AuthContext'
import { uploadDogDocu } from '../../api/dogDocu'
import Modal from '../ui/Modal'
import ModalHeader from '../ui/ModalHeader'
import PrimaryButton from '../ui/PrimaryButton'
import SecondaryButton from '../ui/SecondaryButton'

export default function DogDocument({ dogId, editable }) {
    const { t } = useTranslation()
    const { token } = useAuth()
    const [hasDoc, setHasDoc] = useState(null)       // null = on ne sait pas encore
    const [progress, setProgress] = useState(null)   // null = pas d'envoi en cours
    const [error, setError] = useState('')
    const [showDelete, setShowDelete] = useState(false)
    const fileInputRef = useRef(null)

    // 1. Au chargement : est-ce que le chien a déjà un document ?
    useEffect(() => {
        const checkDoc = async () => {
            const res = await authFetch(`/api/dog-docu/${dogId}`)
            if (res.ok) {
                setHasDoc(true)
            } else {
                setHasDoc(false)      // 404 = pas de document, ce n'est pas une erreur
            }
        }
        checkDoc()
    }, [dogId])

    // 2. L'utilisateur choisit un fichier
    const handleFile = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setError('')

        if (file.type !== 'application/pdf') {
            setError(t('DocuNotPdf'))
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setError(t('DocuTooBig'))
            return
        }

        setProgress(0)
        try {
            await uploadDogDocu(dogId, file, token, setProgress)
            setHasDoc(true)
        } catch {
            setError(t('DocuError'))
        }
        setProgress(null)
    }

    // 3. Ouvrir le PDF dans un nouvel onglet
    const handleOpen = async () => {
        const res = await authFetch(`/api/dog-docu/${dogId}`)
        if (!res.ok) {
            setError(t('DocuError'))
            return
        }
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
    }

    // 4. Supprimer le document
    const handleDelete = async () => {
        const res = await authFetch(`/api/dog-docu/${dogId}`, { method: 'DELETE' })
        if (res.ok) {
            setHasDoc(false)
        } else {
            setError(t('DocuError'))
        }
        setShowDelete(false)
    }

    return (
        <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-text-caption mb-2">{t('HealthRecord')}</p>

            {hasDoc === false && <p className="text-sm text-text-caption">{t('DocuNone')}</p>}
            {hasDoc === true && <p className="text-sm text-text-secondary">{t('DocuPresent')}</p>}

            {progress !== null && (
                <div className="mt-2">
                    <p className="text-xs text-text-caption">{progress}%</p>
                    <div role="progressbar" aria-valuenow={progress}
                         className="h-1 w-full bg-surface-mid rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            )}

            {error && <p className="mt-2 text-xs text-action-pass">{error}</p>}

            <div className="mt-3 flex flex-wrap gap-2">
                {hasDoc && (
                    <SecondaryButton onClick={handleOpen}>{t('DocuOpen')}</SecondaryButton>
                )}
                {editable && (
                    <SecondaryButton onClick={() => fileInputRef.current.click()} disabled={progress !== null}>
                        {hasDoc ? t('DocuReplace') : t('DocuAdd')}
                    </SecondaryButton>
                )}
                {editable && hasDoc && (
                    <SecondaryButton onClick={() => setShowDelete(true)}>{t('DocuDelete')}</SecondaryButton>
                )}
            </div>

            {editable && <p className="mt-2 text-xs text-text-caption">{t('DocuWarning')}</p>}

            <input ref={fileInputRef} type="file" accept="application/pdf"
                   className="hidden" onChange={handleFile} />

            {showDelete && (
                <Modal onClose={() => setShowDelete(false)} width="w-full mx-4 sm:w-96">
                    <ModalHeader title={t('DocuDeleteTitle')} />
                    <div className="flex gap-3 w-full mt-2">
                        <SecondaryButton onClick={() => setShowDelete(false)}>{t('Cancel')}</SecondaryButton>
                        <PrimaryButton onClick={handleDelete}>{t('Confirm')}</PrimaryButton>
                    </div>
                </Modal>
            )}
        </div>
    )
}