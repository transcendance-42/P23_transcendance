import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBarAuth from '../components/ui/NavBarAuth'
import DogProfile from '../components/Profile/DogProfile'
import UserProfile from '../components/Profile/UserProfile'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import { authFetch, getToken } from '../api/authFetch'
import Avatar from '../components/ui/Avatar'
import PrimaryButton from '../components/ui/PrimaryButton'
import Modal from '../components/ui/Modal'
import ModalHeader from '../components/ui/ModalHeader'
import SecondaryButton from '../components/ui/SecondaryButton'
import { uploadFile } from '../api/upload'
import { validateImage } from '../utils/validateImage'

const REQUIRED_USER_FIELDS = [
    { field: 'first_name',    label: 'FirstName'   },
    { field: 'last_name',     label: 'LastName'    },
    { field: 'city',          label: 'City'        },
    { field: 'date_of_birth', label: 'DateOfBirth' },
    { field: 'file_path',     label: 'Avatar'      },
]
 
export default function Profile() {
    const { t } = useTranslation()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { userId, logout, refreshUser } = useAuth()
    const [avatarUrl, setAvatarUrl] = useState(null)
    const isAdmin = user?.role === 'admin'
    const [showDeactivateModal, setShowDeactivateModal] = useState(false)
    const [avatarProgress, setAvatarProgress] = useState(null)
    const [avatarError, setAvatarError] = useState('')

    const handleAvatarUpload = async (file) => {
        const err = validateImage(file, t)
        if (err) { setAvatarError(err); return }
        setAvatarError('')
        setAvatarProgress(0)
        try {
            await uploadFile('PUT', `/api/user/${userId}/pic`, file, getToken(), setAvatarProgress)
            setAvatarUrl(URL.createObjectURL(file))
            const response = await authFetch(`/api/users/${userId}`)
            if (response.ok) setUser(await response.json())
            await refreshUser()
        } catch {
            setAvatarError(t('ErrAvatarUpload'))
        } finally {
            setAvatarProgress(null)
        }
    }

    const handleDeactivate = async () => {
        await authFetch(`/api/users/${userId}/deactivate`, { method: 'PATCH' })
        setShowDeactivateModal(false)
        await logout()
    }

    useEffect(() => {
        const load = async () => {
            try {
                const response = await authFetch(`/api/users/${userId}`)
                if (!response.ok) { setError(t('ErrServer')); return }
                const data = await response.json()
                setUser(data)
            } catch (e) {
                setError(t('ErrServer'))
            } finally {
                setLoading(false)
            }
        }
        if (userId) load()
        else { setError(t('ErrorConnection')); setLoading(false) }
    }, [userId])

    useEffect(() => {
        if (!userId) return
        authFetch(`/api/user/${userId}/pic`)
            .then(res => res.ok ? res.blob() : null)
            .then(blob => { if (blob) setAvatarUrl(URL.createObjectURL(blob)) })
            .catch(() => {})
    }, [userId])
 
    if (loading) return <p className="p-8">{t('Loading')}</p>
    if (error)   return <p className="p-8 text-action-pass">{error}</p>
 
    const dog = user.dogs ?? null
 
    const missingUserFields = REQUIRED_USER_FIELDS.filter(({ field }) => !user[field])
    const isProfileComplete = missingUserFields.length === 0 && !!dog && !!user.file_path
    return (
        <div className="min-h-screen bg-surface-cream">
            <NavBarAuth isProfileComplete={isProfileComplete} />

            <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Avatar size='lg' url={avatarUrl} progress={avatarProgress} onUpload={isAdmin ? undefined : handleAvatarUpload}/>
                    <div>
                        <h1 className="font-heading text-3xl font-bold text-text-primary">{t('MyProfile')}</h1>
                        {avatarError && <p className="text-action-pass text-xs mt-1">{avatarError}</p>}
                    </div>
                </div>

                {user.role === 'admin' ? (
                    <div className="rounded-md border border-primary bg-primary/10 px-4 py-3">
                        <p className="font-semibold text-primary text-sm">
                            {t('AdminAccount')}
                        </p>
                    </div>
                ) : !isProfileComplete && (
                    <div className="rounded-md border border-primary bg-primary/10 px-4 py-3 flex flex-col gap-1">
                        <p className="font-semibold text-primary text-sm">
                            {t('ProfileIncompleteWarning')}
                        </p>
                        <ul className="list-disc list-inside text-primary text-xs space-y-0.5">
                            {!dog && <li>{t('ProfileMissingDog')}</li>}
                            {missingUserFields.map(({ field, label }) => (
                                <li key={field}>{t(label)}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {!isAdmin && (
                    !dog ? (
                        <div className="rounded-md bg-surface-white p-6 text-center shadow-soft">
                            <p className="text-text-secondary">{t('Profile1')}</p>
                            <Link
                                to="/registerDog"
                                className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-surface-white transition hover:bg-primary-hover"
                            >
                                {t('Profile2')}
                            </Link>
                        </div>
                    ) : (
                        <DogProfile
                            dog={dog}
                            onSaved={(updatedDog) => setUser({...user, dogs: updatedDog})}
                            onDeleted={() => setUser({ ...user, dogs: null})}
                        />
                    )
                )}

                <UserProfile
                    user={user}
                    onSaved={setUser}
                    missingFields={isAdmin ? [] : missingUserFields.map(f => f.field)}
                />
                {!isAdmin &&
                    <PrimaryButton onClick={() => setShowDeactivateModal(true)}>{t("DeactivateProfile")}</PrimaryButton>
                }
                {showDeactivateModal && (
                    <Modal onClose={() => setShowDeactivateModal(false)} width="w-full mx-4 sm:w-96" bg="backdrop-blur-md bg-black/30">
                        <ModalHeader title={t('DeactivateProfile')} />
                        <p className="text-text-caption text-sm text-center">
                            {t('DeactivateProfileConfirm')}
                        </p>
                        <div className="flex gap-3 w-full mt-2">
                            <SecondaryButton onClick={() => setShowDeactivateModal(false)}>{t('Cancel')}</SecondaryButton>
                            <PrimaryButton onClick={handleDeactivate}>{t('Confirm')}</PrimaryButton>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    )
}