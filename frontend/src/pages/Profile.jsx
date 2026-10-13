import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBarAuth from '../components/ui/NavBarAuth'
import DogProfile from '../components/Profile/DogProfile'
import UserProfile from '../components/Profile/UserProfile'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import { authFetch } from '../api/authFetch'
import Avatar from '../components/ui/Avatar'

const REQUIRED_USER_FIELDS = [
    { field: 'first_name',    label: 'FirstName'   },
    { field: 'last_name',     label: 'LastName'    },
    { field: 'city',          label: 'City'        },
    { field: 'date_of_birth', label: 'DateOfBirth' },
]
 
export default function Profile() {
    const { t } = useTranslation()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { userId } = useAuth()
    const [avatarUrl, setAvatarUrl] = useState(null)

    const handleAvatarUpload = async (file) => {
        const fd = new FormData()
        fd.append('file', file)

        const uploadedFile = fd.get('file')
        // affihcage file
        console.log('--- AVATAR UPLOAD ---')
        console.log('Filename:', uploadedFile?.name)
        console.log('Mimetype:', uploadedFile?.type)
        console.log('Size:', uploadedFile?.size, 'bytes')

        const res = await authFetch(`/api/user/${userId}/pic`, {
            method: 'PUT',
            body: fd
        })
        if (res.ok) {
            const url = URL.createObjectURL(file)
            setAvatarUrl(url)
        }
    }   

    useEffect(() => {
        const load = async () => {
            try {
                const response = await authFetch(`/api/users/${userId}`)
                if (!response.ok) { setError('Profil introuvable'); return }
                const data = await response.json()
                setUser(data)
            } catch (e) {
                console.log(e.message)
                setError('Impossible de contacter le serveur')
            } finally {
                setLoading(false)
            }
        }
        if (userId) load()
        else { setError('Pas connecté'); setLoading(false) }
    }, [userId])
 
    if (loading) return <p className="p-8">{t('Loading')}</p>
    if (error)   return <p className="p-8 text-action-pass">{error}</p>
 
    const dog = user.dogs ?? null
 
    const missingUserFields = REQUIRED_USER_FIELDS.filter(({ field }) => !user[field])
    const isProfileComplete = missingUserFields.length === 0 && !!dog
    console.log('Profile render, isProfileComplete =', isProfileComplete)
    return (
        <div className="min-h-screen bg-surface-cream">
            <NavBarAuth isProfileComplete={isProfileComplete} />

            <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Avatar size='lg' url={avatarUrl} onUpload={handleAvatarUpload}/>
                    <h1 className="font-heading text-3xl font-bold text-text-primary">
                        {t('MyProfile')}
                    </h1>
                </div>

                {!isProfileComplete && (
                    <div className="rounded-md border border-primary bg-primary/10 px-4 py-3 flex flex-col gap-1">
                        <p className="font-semibold text-primary text-sm">
                            {t('ProfileIncompleteWarning')}
                        </p>
                        <ul className="list-disc list-inside text-primary text-xs space-y-0.5">
                            {!dog && (
                                <li>{t('ProfileMissingDog')}</li>
                            )}
                            {missingUserFields.map(({ field, label }) => (
                                <li key={field}>{t(label)}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {!dog ? (
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
                        onSaved={(updatedDog) =>
                            setUser({...user, dogs: updatedDog})
                        }
                        onDeleted={() =>
                            setUser({ ...user, dogs: null})
                        }
                    />
                )}
                <UserProfile
                    user={user}
                    onSaved={setUser}
                    missingFields={missingUserFields.map(f => f.field)}
                />
                {console.log(user)}
            </div>
        </div>
    )
}