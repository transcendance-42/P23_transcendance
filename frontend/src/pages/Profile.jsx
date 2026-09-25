import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBarAuth from '../components/ui/NavBarAuth'
import DogProfile from '../components/Profile/DogProfile'
import UserProfile from '../components/Profile/UserProfile'
import { useTranslation } from 'react-i18next'

export default function Profile() {
    const { t } = useTranslation()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`)
                if (!response.ok) {
                    setError('Profil introuvable')
                    return
                }
                const data = await response.json()
                setUser(data)
            } catch (e) {
                setError('Impossible de contacter le serveur')
            } finally {
                setLoading(false)
            }
        }
        if (userId) load()
        else {
            setError('Pas connecté')
            setLoading(false)
        }
    }, [userId])

    if (loading) return <p className="p-8">{t('Loading')}</p>
    if (error) return <p className="p-8 text-action-pass">{error}</p>

        const dogs = user.dogs || []

    return (
        <div className="min-h-screen bg-surface-cream">
            <NavBarAuth />

            <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col gap-6">
                <h1 className="font-heading text-3xl font-bold text-text-primary">
                   {t('MyProfile')}
                </h1>

                {dogs.length === 0 ? (
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
                    dogs.map(dog => (
                    <DogProfile
                        key={dog.id}
                        dog={dog}
                        onSaved={(updatedDog) =>
                            setUser({
                                ...user,
                                dogs: user.dogs.map(d => d.id === updatedDog.id ? updatedDog : d)
                            })
                        }
                    />
                )))}

                <UserProfile user={user} onSaved={setUser} />
                {console.log(user)}
            </div>
        </div>
    )
}