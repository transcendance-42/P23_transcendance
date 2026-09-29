import { useState } from "react"
import SecondaryButton from "../ui/SecondaryButton";
import ProfileField from "./ProfileField";
import { useTranslation } from 'react-i18next'
import { authFetch } from "../../api/authFetch";

export default function UserProfile({ user, onSaved}) {
    const { t } = useTranslation()
    const [editing, setEditing] = useState(false);
    const [formData, setFormdata] = useState({});
    const [error, setError] = useState('');
    // clique sur bouton Modifier
    // editing false to true
    // handleChange sur chaque inputField

    const handleEditing = () => {
        setFormdata({
            first_name:user.first_name,
            last_name:user.last_name,
            city:user.city
        })
        setEditing(true);
    }

    const handleCancel = () => {
        setEditing(false);
    }

    const handleChange = (field) => (e) =>
        setFormdata({ ...formData, [field]: e.target.value })

    const handleSave = async () => {
        setError('');
        try{
            const response = await authFetch(`/api/users/${user.id}`,{
            method:'PUT',
            headers: {'Content-type' : 'application/json' },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            setError(response.status === 409 ? 'Cet email est déjà utilisé' : 'Erreur serveur')
            return
        }
        const data = await response.json();
        onSaved({...user, ...data});
        setEditing(false);
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
                    <ProfileField label="Prénom" value={formData.first_name} onChange={handleChange('first_name')} />
                    <ProfileField label="Nom" value={formData.last_name} onChange={handleChange('last_name')} />
                    <ProfileField label="Ville" value={formData.city} onChange={handleChange('city')} />
                    <SecondaryButton children="Annuler" onClick={handleCancel}/>
                    <SecondaryButton children="Enregistrer les modifications" onClick={handleSave}/>
                </div>
            ) : (
                <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">{t('FirstName')}</dt>
                    <dd className="text-text-secondary">{user.first_name}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">{t('LastName')}</dt>
                    <dd className="text-text-secondary">{user.last_name}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wide text-text-caption">{t('City')}</dt>
                    <dd className="text-text-secondary">{user.city}</dd>
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