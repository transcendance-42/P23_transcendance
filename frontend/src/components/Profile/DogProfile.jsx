import { useState, useEffect, useRef } from "react"
import SecondaryButton from "../ui/SecondaryButton"
import ProfileField from "./ProfileField"
import ProfileSelect from "./ProfileSelect"
import Modal from "../ui/Modal"
import ModalHeader from "../ui/ModalHeader"
import PrimaryButton from "../ui/PrimaryButton"
import { useTranslation } from 'react-i18next'
import { authFetch, getToken } from "../../api/authFetch"
import { useAuth } from "../../auth/AuthContext"
import DogDocument from './DogDocument'
import { validateImage } from '../../utils/validateImage'

const GENDERS = ['Male', 'Female', 'Other']
const SIZES = ['Small', 'Medium', 'Large']

export default function DogProfile({ dog, onSaved, onDeleted }) {
    const { t } = useTranslation()
    const [editing, setEditing] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState('')
    const [uploadProgress, setUploadProgress] = useState(null)
    const [pics, setPics] = useState([])
    const fileInputRef = useRef(null)
    const { refreshUser } = useAuth()

    useEffect(() => {
        let cancel = false
        const createdUrls = []
        const loadPics = async () => {
            try {
                const results = await Promise.allSettled(
                    (dog.dog_pics ?? []).map(async (pic) => {
                        const res = await authFetch(`/api/dog-pics/${pic.id}`)
                        if (!res.ok) return null
                        const blob = await res.blob()
                        const url = URL.createObjectURL(blob)
                        createdUrls.push(url)
                        return { id: pic.id, position: pic.position, url }
                    })
                )
                if (!cancel) {
                    const loaded = results
                        .filter(r => r.status === 'fulfilled' && r.value !== null)
                        .map(r => r.value)
                        .sort((a, b) => a.position - b.position)
                    setPics(loaded)
                }
            } catch (e) {
                setError(t('ErrInvalidFileType'))
            }
        }
 
        loadPics()
 
        return () => {
            cancel = true
        }
    }, [dog.id])

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
        if (!formData.dog_name || !formData.breed || !formData.gender || !formData.age || !formData.size) {
            setError(t('CompleteForm'))
            return
        }
        if (pics.length === 0) {
            setError(t('ErrPhotoRequired'))
            return
        }
        try {
            const response = await authFetch(`/api/dogs/${dog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                setError(t('ErrServer'))
                return
            }
            const data = await response.json()
            onSaved({ ...dog, ...data })
            setEditing(false)
            await refreshUser()
        } catch (e) {
            setError(t('ErrServer'))
        }
    }
 
    const handleDelete = async () => {
        try {
            const response = await authFetch(`/api/dogs/${dog.id}`, { method: 'DELETE' })
            if (response.ok) onDeleted(dog.id)
            else setError(t('ErrServer'))
        } catch (e) {
            setError(t('ErrServer'))
        }
        await refreshUser()
        setShowDeleteModal(false)
    }
    const handleDeletePic = async (picId) => {
        try {
            await authFetch(`/api/dog-pics/${picId}`, { method: 'DELETE' })
            setPics(prev => {
                const pic = prev.find(p => p.id === picId)
                if (pic) URL.revokeObjectURL(pic.url)
                return prev.filter(p => p.id !== picId)
            })
        } catch (e) {
            setError(t('ErrServer'))
        }
    }
 
    const handleAddPic = (e) => {
        const file = e.target.files[0]
        if (!file) return
        e.target.value = ''

        setError('')
        const err = validateImage(file, t)
        if (err) { setError(err); return }
 
        const fd = new FormData()
        fd.append('file', file)
        fd.append('dog_id', String(dog.id))
        fd.append('position', String(pics.length + 1))
 
        setUploadProgress(0)
 
        const xhr = new XMLHttpRequest()
        xhr.open('POST', `/api/dog-pics`)
        const token = getToken()
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
 
        xhr.upload.addEventListener('progress', (ev) => {
            if (ev.lengthComputable)
                setUploadProgress(Math.round((ev.loaded / ev.total) * 100))
        })
 
        xhr.addEventListener('load', () => {
            setUploadProgress(null)
            if (xhr.status >= 200 && xhr.status < 300) {
                const newPic = JSON.parse(xhr.responseText)
                const url = URL.createObjectURL(file)
                setPics(prev => [...prev, { id: newPic.id, position: newPic.position, url }])
            } else {
                setError(t('ErrInvalidFileType'))
            }
        })
 
        xhr.addEventListener('error', () => {
            setUploadProgress(null)
            setError(t('ErrServer'))
        })
 
        xhr.send(fd)
    }
    return (
        <>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)} width="w-full mx-4 sm:w-96" bg="backdrop-blur-md bg-black/30">
                    <ModalHeader title={t('DeleteConfirmTitle')} />
                    <p className="text-text-caption text-sm text-center">
                        {t('DeleteConfirmText', { name: dog.dog_name })}
                    </p>
                    <div className="flex gap-3 w-full mt-2">
                        <SecondaryButton onClick={() => setShowDeleteModal(false)}>
                            {t('Cancel')}
                        </SecondaryButton>
                        <PrimaryButton onClick={handleDelete}>
                            {t('Confirm')}
                        </PrimaryButton>
                    </div>
                </Modal>
            )}
 
            <div className="rounded-md bg-surface-white p-6 shadow-soft">
                <div className="flex items-center justify-between">
                    <h2 className="font-heading text-2xl font-bold text-text-primary">{dog.dog_name}</h2>
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
 
                        <div>
                            <p className="text-xs uppercase tracking-wide text-text-caption mb-2">{t('Photos')}</p>
                            <div className="grid grid-cols-3 gap-2">
                                {pics.map((pic) => (
                                    <div key={pic.id} className="relative aspect-square">
                                        <img
                                            src={pic.url}
                                            alt="dog"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <button
                                            onClick={() => handleDeletePic(pic.id)}
                                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary hover:bg-primary-hover text-surface-white text-xs flex items-center justify-center transition z-10"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                {pics.length < 5 && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploadProgress !== null}
                                        className="aspect-square rounded-md border-2 border-dashed border-surface-mid hover:border-primary text-text-caption hover:text-primary flex flex-col items-center justify-center gap-1 transition disabled:opacity-50 overflow-hidden relative"
                                    >
                                        {uploadProgress !== null ? (
                                            <>
                                                <span className="text-xs font-bold text-primary z-10">{uploadProgress}%</span>
                                                <div
                                                    className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-200"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-xl">+</span>
                                                <span className="text-xs">{t('AddPhoto')}</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAddPic} />
                        </div>
 
                        {error && <p className="text-action-pass text-xs">{error}</p>}
                        <DogDocument dogId={dog.id} editable={editing} />
                        <div className="mt-2 flex justify-between gap-2">
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="text-text-caption hover:text-action-pass transition text-lg">
                                🗑
                            </button>
                            <div className="flex gap-2">
                                <SecondaryButton onClick={handleCancel}>{t('Cancel')}</SecondaryButton>
                                <SecondaryButton onClick={handleSave}>{t('Save')}</SecondaryButton>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {error && <p className="text-action-pass text-xs mt-2">{error}</p>}
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
 
                        {pics.length > 0 && (
                            <div className="mt-5">
                                <p className="text-xs uppercase tracking-wide text-text-caption mb-2">{t('Photos')}</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {pics.map(pic => (
                                        <div key={pic.id} className="aspect-square">
                                            <img src={pic.url} alt="dog" className="w-full h-full object-cover rounded-md" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <DogDocument dogId={dog.id} editable={editing} />
                    </>
                )}
            </div>
        </>
    )
}
