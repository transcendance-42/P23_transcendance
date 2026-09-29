import { useTranslation } from 'react-i18next'

const DogInfo = ({ dog }) => {
    const { t } = useTranslation()
    return (
    <div className="p-4">
        <h2 className=" text-2xl text-primary font-heading">{dog.dog_name}, {dog.age}</h2>
        <p className="text-sm text-surface-cream  mt-1">📍 {dog.city}</p>
        <p className="text-sm text-surface-cream">{dog.gender === 'Male' ? '♂' : '♀'} {dog.gender}</p>
        <p className="text-sm text-surface-cream mt-1">🐾 {dog.breed}</p>
        <p className="text-xs font-semibold text-surface-white mt-3">{t('AboutMe')}</p>
        <p className="text-xs text-surface-cream mt-1">{dog.bio}</p>
    </div>
    )
}

export default DogInfo