import {useState} from 'react';
import {motion, useMotionValue, useTransform } from 'framer-motion'
import surfImg from '../assets/surf.jpg'
import joyaImg from '../assets/joya.jpg'
import woodyImg from '../assets/woody.jpg'
import {sendRequestSwipes} from '../api/swipes'

const Card = ({ dog, index, total, onSwipe }) => {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
    const rotateRaw = useTransform(x, [-150, 150], [-10, 10]);
    const isFront = index === 0
    const rotate = useTransform(() =>  {
        const offset = isFront? 0: index % 2 ? 6: -6;
        return `${rotateRaw.get() +offset}deg`;
    });
    const handleDragEnd = () => {
        if (Math.abs(x.get()) > 50)
        {
            const direction = x ? 'right' : 'left'
            sendRequestSwipes(direction)
            onSwipe()
        }      
    };
    const likeOpacity = useTransform(x, [0, 100], [0, 0.4])
    const passOpacity = useTransform(x, [-100, 0], [0.4, 0])
    const likeOpacityBadge = useTransform(x, [0, 50], [0, 1])
    const passOpacityBadge = useTransform(x, [-50, 0], [1, 0])

    return (
        <motion.div
        className={`absolute w-100 h-150 bg-pink-200 rounded-2xl shadow-md hover:cursor-grab active:cursor-grabbing select-none ${!isFront ? 'blur-sm' : ''}`}
        style={{
            top: index * 8,
            left: index * 4,
            zIndex: total - index,
            x,
            opacity,
            rotate,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd} >
        <motion.div style={{ opacity: likeOpacity }} className="absolute inset-0 bg-green-400 rounded-2xl z-10" />
        <motion.div style={{ opacity: passOpacity }} className="absolute inset-0 bg-red-400 rounded-2xl z-10" />
        <motion.div style={{ opacity: likeOpacityBadge }} className="absolute top-4 left-4 z-20 text-green-600 font-bold text-2xl border-4 border-green-600 px-3 py-1 rounded-lg rotate-[-20deg]">
            LIKE
        </motion.div>
        <motion.div style={{ opacity: passOpacityBadge }} className="absolute top-4 right-4 z-20 text-red-600 font-bold text-2xl border-4 border-red-600 px-3 py-1 rounded-lg rotate-[20deg]">
            PASS
        </motion.div>
        <img 
        src={dog.img} 
        alt={dog.name} 
        className="w-full h-80 object-cover pointer-events-none rounded-2xl mt-2 px-2" 
        />
        <div className="p-4">
            <h2 className="text-2xl font-bold">{dog.name}, {dog.age}</h2>
            <p className="text-sm text-gray-600 mt-1">📍 {dog.city}</p>
            <p className="text-sm text-gray-600">{dog.gender === 'Male' ? '♂' : '♀'} {dog.gender}</p>
            <p className="text-sm text-gray-600 mt-1"> 🐾 {dog.breed}</p>
            <p className="text-xs font-semibold text-gray-700 mt-3">About me</p>
            <p className="text-xs text-gray-600 mt-1">{dog.bio}</p>
        </div>
        </motion.div>
    )
}

//DogCard est temporaire c'est en attendant que ça soit brancher au backend 
// le useState() qui est mnt hardcodé sera remplacé par useEffet() qui va fetch Get /api/dogs
//les images qui sont mnt en local dans /assets seront remplacés par els vrai chehmins depuis dog_pics
//mais on gardera removeCard
const DogCard = () => {
  const [dogs, setDogs] = useState([
    { name: 'Surf', age: 11, city: 'Mont-Sur-Lausanne', breed: 'Berger australien toy', size: 'Small', gender: 'Male', bio: 'Funny looking, does a lot of noise but is kinda nice', img: surfImg },
    { name: 'Joya', age: 1, city: 'Gland', breed: 'unknown', size: 'Medium', gender: 'Female', bio: 'Joya has a lot of energy and loves to play with humans and other dogs.', img: joyaImg },
    { name: 'Woody', age: 5, city: 'Pully', breed: 'Labrador', size: 'Medium', gender: 'Male', bio: 'Woody is a cool kid that loves to catch up on sleep on rainy day', img: woodyImg }
  ])
  const removeCard = (name) => {
    setDogs(dogs.filter(dog => dog.name !== name))
  }

  return (
    <div className="relative w-100 h-150">
      {dogs.map((dog, index) => (
        <Card
            key={dog.name}
            dog={dog}
            index={index}
            total={dogs.length} 
            onSwipe={() =>removeCard(dog.name)}
        />
      ))}
    </div>
  )
}

export default DogCard