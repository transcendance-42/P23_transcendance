import {useState, useEffect} from 'react';
import {motion, useMotionValue, useTransform } from 'framer-motion'
import {sendRequestSwipes} from '../../api/swipes'
import DogInfo from '../ui/DogInfo'
import Badge from '../ui/Badge'
import SwipeButton from '../ui/SwipeButton'
import EmptyState from '../ui/EmptyState'
import { fetchDogs } from '../../api/dogs'


const Card = ({ dog, index, total, onSwipe, onMatch }) => {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
    const rotateRaw = useTransform(x, [-150, 150], [-10, 10]);
    const isFront = index === 0

    const rotate = useTransform(() =>  {
        const offset = isFront? 0: index % 2 ? 6: -6;
        return `${rotateRaw.get() +offset}deg`;
    });
    
    const handleDragEnd = async () => {
      if (Math.abs(x.get()) > 50) {
        const direction = x.get() > 0 ? 'right' : 'left'
        try {
            const data = await sendRequestSwipes(direction, dog.id)
            if (data.matched)
                onMatch()
        } catch (e) {
            console.error('Swipe error:', e.message)
        }
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
      dragConstraints={{ left: 0, right: 0}}
      onDragEnd={handleDragEnd} >

      <motion.div style={{ opacity: likeOpacity }} className="absolute inset-0 bg-green-400 rounded-2xl z-10" />
      <motion.div style={{ opacity: passOpacity }} className="absolute inset-0 bg-red-400 rounded-2xl z-10" />
      <Badge type="like" opacity={likeOpacityBadge} />
      <Badge type="pass" opacity={passOpacityBadge} />

      <img 
      src={dog.img} 
      alt={dog.name} 
      className="w-full h-80 object-cover pointer-events-none rounded-2xl mt-2 px-2" 
      />

      <DogInfo dog={dog} />

      </motion.div>
    )
}

//DogCard est temporaire c'est en attendant que ça soit brancher au backend 
// le useState() qui est mnt hardcodé sera remplacé par useEffet() qui va fetch Get /api/dogs
//les images qui sont mnt en local dans /assets seront remplacés par els vrai chehmins depuis dog_pics
//mais on gardera removeCard
const DogCard = ({ onMatch }) => {
    const [dogs, setDogs] = useState([])

    useEffect(() => {
        fetchDogs()
            .then(data => setDogs(data))
            .catch(e => console.error(e))
    }, [])
    const removeCard = (id) => {
      setDogs(dogs.filter(dog => dog.id !== id))
    }

  const handleButtonSwipe = async (direction) => {
    const frontDog = dogs[0]
    try {
        const data = await sendRequestSwipes(direction, frontDog.id)
        if (data.matched)
            onMatch()
    } catch (e) {
        console.error('Swipe error:', e.message)
    }
    removeCard(frontDog.id)
}

if (dogs.length === 0)
    return <EmptyState title="No more dogs nearby" subtitle="Come back later!" />

return (
    <div className="relative w-100 h-150">
      <div className="relative w-100 h-150">
        {dogs.map((dog, index) => (
          <Card
              key={dog.id}
              dog={dog}
              index={index}
              total={dogs.length}
              onSwipe={() => removeCard(dog.id)}
              onMatch={onMatch}
          />
        ))}
      </div>
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-8 z-50">
        <SwipeButton direction="left" onClick={() => handleButtonSwipe('left')} />
        <SwipeButton direction="right" onClick={() => handleButtonSwipe('right')} />
      </div>
    </div>
  )
}

export default DogCard