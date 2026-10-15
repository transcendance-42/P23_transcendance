import { useState } from "react"
import SecondaryButton from "../ui/SecondaryButton";
import ProfileField from "./ProfileField";
import { useTranslation } from 'react-i18next'
import { authFetch } from "../../api/authFetch";
import { useAuth } from "../../auth/AuthContext"
import LocationButton from '../Map/LocationButton'

export default function UserProfile({ user, onSaved, missingFields = [] }) {
    const { t } = useTranslation()
    const [editing, setEditing] = useState(false)
    const [formData, setFormdata] = useState({})
    const [error, setError] = useState('')
    const isMissing = (field) => missingFields.includes(field)
    const { refreshUser } = useAuth()
    // clique sur bouton Modifier
    // editing false to true
    // handleChange sur chaque inputField

    const handleEditing = () => {
        setFormdata({
            first_name: user.first_name,
            last_name: user.last_name,
            city: user.city,
            latitude: user.latitude || null,
            longitude: user.longitude || null,
            radius: user.radius || '',
            date_of_birth: user.date_of_birth ? user.date_of_birth.slice(0, 10) : ''
        })
        setEditing(true);
    }

    const handleLocationChange = (city, latitude, longitude, radius) => {
        setFormdata(prev => ({
            ...prev,
            city,
            latitude,
            longitude,
            radius
        }))
    }

    const handleCancel = () => {
        setEditing(false);
    }

    const handleChange = (field) => (e) =>
        setFormdata({ ...formData, [field]: e.target.value })

    const handleSave = async () => {
        setError('');
        try{
            const response = await authFetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData)
            })
        if (!response.ok) {
            setError(response.status === 409 ? 'Cet email est déjà utilisé' : 'Erreur serveur')
            return
        }
        const data = await response.json();
        if (formData.latitude && formData.longitude) {
        await authFetch(`/api/users/${user.id}/position`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                latitude: formData.latitude,
                longitude: formData.longitude,
                radius: formData.radius,
                city: formData.city
            })
        })
    }
        onSaved({...user, ...data});
        setEditing(false);
        await refreshUser()
        } catch(e){
            setError('Impossible de contacter le serveur');
        }
    }
        

    return (
        <div className="rounded-md bg-surface-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold text-text-primary">{t('MyAccount')}</h2>
                {!editing && <SecondaryButton onClick={handleEditing}> {t('Edit')}</SecondaryButton>}
             </div>
            {editing? (
                <div className="mt-4 flex flex-col gap-3">
                    {error && <p className="text-action-pass text-xs">{error}</p>}
                    <ProfileField label={t('FirstName')} value={formData.first_name} onChange={handleChange('first_name')} error={isMissing('first_name')} />
                    <ProfileField label={t('LastName')}  value={formData.last_name}  onChange={handleChange('last_name')}  error={isMissing('last_name')} />
                    <LocationButton
                        onLocationChange={handleLocationChange}
                        initialCity={formData.city}
                        initialRadius={formData.radius}
                        dark={false}
                    />
                    <ProfileField label={t('DateOfBirth')} type="date" value={formData.date_of_birth} onChange={handleChange('date_of_birth')} error={isMissing('date_of_birth')} />
                    <div className="flex gap-2 mt-2">
                        <SecondaryButton onClick={handleCancel}>{t('Cancel')}</SecondaryButton>
                        <SecondaryButton onClick={handleSave}>{t('Save')}</SecondaryButton>
                    </div>
                </div>
            ) : (
                <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <dt className={`text-xs uppercase tracking-wide ${isMissing('first_name') ? 'text-primary font-semibold' : 'text-text-caption'}`}>{t('FirstName')}</dt>
                    <dd className="text-text-secondary">{user.first_name || <span className="text-primary italic text-xs">{t('Missing')}</span>}</dd>
                </div>
                <div>
                    <dt className={`text-xs uppercase tracking-wide ${isMissing('last_name') ? 'text-primary font-semibold' : 'text-text-caption'}`}>{t('LastName')}</dt>
                    <dd className="text-text-secondary">{user.last_name || <span className="text-primary italic text-xs">{t('Missing')}</span>}</dd>
                </div>
                <div>
                    <dt className={`text-xs uppercase tracking-wide ${isMissing('city') ? 'text-primary font-semibold' : 'text-text-caption'}`}>{t('City')}</dt>
                    <dd className="text-text-secondary">
                        {user.city 
                            ? `${user.city}${user.radius ? ` (${user.radius} km)` : ''}`
                            : <span className="text-primary italic text-xs">{t('Missing')}</span>
                        }
                    </dd>
                </div>
                <div>
                    <dt className={`text-xs uppercase tracking-wide ${isMissing('date_of_birth') ? 'text-primary font-semibold' : 'text-text-caption'}`}>{t('DateOfBirth')}</dt>
                    <dd className="text-text-secondary">{user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : <span className="text-primary italic text-xs">{t('Missing')}</span>}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">{t('Email')}</dt>
                    <dd className="text-text-secondary">{user.email}</dd>
                </div>
            </dl>
            )}
        </div>
    )
}