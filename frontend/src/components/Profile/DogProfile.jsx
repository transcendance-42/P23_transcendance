import { useState } from "react"
import SecondaryButton from "../ui/SecondaryButton"
import ProfileField from "./ProfileField"
import ProfileSelect from "./ProfileSelect"
import { useTranslation } from 'react-i18next'
import { authFetch } from "../../api/authFetch"

const GENDERS = ['Male', 'Female', 'Other']
const SIZES = ['Small', 'Medium', 'Large']

export default function DogProfile({ dog, onSaved }) {
    const { t } = useTranslation()
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState('')

    const handleEditing = () => {
        setError('')
        setFormData({
            dog_name: dog.dog_name,
            breed: dog.breed ?? '',
            gender: dog.gender ?? 'Other',
            age: dog.age ?? '',
            size: dog.size ?? 'Medium',
            bio: dog.bio ?? '',
        })
        setEditing(true)
    }

    const handleChange = (field) => (e) =>
        setFormData({ ...formData, [field]: e.target.value })

    const handleCancel = () => {
        setError('')
        setEditing(false)
    }

    const handleSave = async () => {
        setError('')
        try {
            const response = await authFetch(`/api/dogs/${dog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                setError('Enregistrement impossible, réessaie')
                return
            }
            const data = await response.json()
            onSaved({ ...dog, ...data })
            setEditing(false)
        } catch (e) {
            console.log(e);
            setError('Impossible de contacter le serveur')
        }
    }

    return (
        <div className="rounded-md bg-surface-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold text-text-primary">
                    {dog.dog_name}
                </h2>
                {!editing && <SecondaryButton onClick={handleEditing}>{t('Edit')}</SecondaryButton>}
            </div>

            {editing ? (
                <div className="mt-4 flex flex-col gap-3">
                    <ProfileField label="Nom" value={formData.dog_name} onChange={handleChange('dog_name')} />
                    <ProfileField label="Race" value={formData.breed} onChange={handleChange('breed')} />
                    <ProfileSelect label="Genre" value={formData.gender} onChange={handleChange('gender')} options={GENDERS} />
                    <ProfileField label="Âge" type="number" value={formData.age} onChange={handleChange('age')} />
                    <ProfileSelect label="Taille" value={formData.size} onChange={handleChange('size')} options={SIZES} />
                    <ProfileField label="Bio" value={formData.bio} onChange={handleChange('bio')} />

                    {error && <p className="text-action-pass text-xs">{error}</p>}

                    <div className="mt-2 flex justify-end gap-2">
                        <SecondaryButton onClick={handleCancel}>{t('Cancel')}</SecondaryButton>
                        <SecondaryButton onClick={handleSave}>{t('Save')}</SecondaryButton>
                    </div>
                </div>
            ) : (
                <>
                    <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs uppercase tracking-wide text-text-caption">{t('Race')}</dt>
                            <dd className="text-text-secondary">{dog.breed || '—'}</dd>
                        </div>
                        <div>
                            <dt className="text-xs uppercase tracking-wide text-text-caption">{t('Age')}</dt>
                            <dd className="text-text-secondary">{dog.age} ans</dd>
                        </div>
                        <div>
                            <dt className="text-xs uppercase tracking-wide text-text-caption">{t('Size')}</dt>
                            <dd className="text-text-secondary">{dog.size}</dd>
                        </div>
                        <div>
                            <dt className="text-xs uppercase tracking-wide text-text-caption">{t('Gender')}</dt>
                            <dd className="text-text-secondary">
                                {dog.gender === 'Male' ? '♂' : dog.gender === 'Female' ? '♀' : ''} {dog.gender}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-5">
                        <p className="text-xs uppercase tracking-wide text-text-caption">{t('Bio')}</p>
                        <p className="mt-1 text-text-secondary">{dog.bio}</p>
                    </div>
                </>
            )}
        </div>
    )
}