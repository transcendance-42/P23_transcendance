const DogInfo = ({ dog }) => (
    <div className="p-4">
        <h2 className="text-2xl font-bold">{dog.dog_name}, {dog.age}</h2>
        <p className="text-sm text-gray-600 mt-1">📍 {dog.city}</p>
        <p className="text-sm text-gray-600">{dog.gender === 'Male' ? '♂' : '♀'} {dog.gender}</p>
        <p className="text-sm text-gray-600 mt-1">🐾 {dog.breed}</p>
        <p className="text-xs font-semibold text-gray-700 mt-3">About me</p>
        <p className="text-xs text-gray-600 mt-1">{dog.bio}</p>
    </div>
)

export default DogInfo