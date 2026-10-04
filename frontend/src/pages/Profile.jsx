import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBarAuth from '../components/ui/NavBarAuth'
import DogProfile from '../components/Profile/DogProfile'
import UserProfile from '../components/Profile/UserProfile'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import { authFetch } from '../api/authFetch'

export default function Profile() {
    const { t } = useTranslation()
    const { user, setUser, loading } = useAuth()

    if (loading) return <p className="p-8">{t('Loading')}</p>

    const dog = user.dogs

    return (
        <div className="min-h-screen bg-surface-cream">
            <NavBarAuth />

            <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col gap-6">
                <h1 className="font-heading text-3xl font-bold text-text-primary">
                   {t('MyProfile')}
                </h1>

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
                <UserProfile user={user} onSaved={setUser} />
                {console.log(user)}
            </div>
        </div>
    )
}