import 'dotenv/config'
import prismaPkg from '@prisma/client'
const { PrismaClient } = prismaPkg
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const passwordHash = await bcrypt.hash('ekipekip', 10)
const adminPasswordHash = await bcrypt.hash('admin123', 10)

const cityCoords = {
  'Zürich':    [47.3769, 8.5417],
  'Berne':     [46.9480, 7.4474],
  'Lugano':    [46.0037, 8.9511],
  'Bâle':      [47.5596, 7.5886],
  'Fribourg':  [46.8065, 7.1620],
  'Neuchâtel': [46.9920, 6.9319],
  'Sion':      [46.2293, 7.3590],
  'Lausanne':  [46.5197, 6.6323],
  'Genève':    [46.2044, 6.1432],
  'Renens':    [46.5397, 6.5882],
}

// Décalage aléatoire d'environ ±2 km, pour que les utilisateurs d'une même
// ville ne soient pas tous au même point (utile pour tester le tri par distance)
const jitter = () => (Math.random() - 0.5) * 0.04

const users = [
  { email: 'admin@tindog.com',    password_hash: adminPasswordHash, first_name: 'admin',     last_name: 'admin',      city: 'Lausanne', date_of_birth: new Date('2000-01-01'), role: 'admin' },
  { email: 'brad@tindog.com',     password_hash: passwordHash,      first_name: 'Brad',      last_name: 'Pitt',       city: 'Lausanne', date_of_birth: new Date('1963-12-18') },
  { email: 'angelina@tindog.com', password_hash: passwordHash,      first_name: 'Angelina',  last_name: 'Jolie',      city: 'Renens',   date_of_birth: new Date('1975-06-04') },
  { email: 'johnny@tindog.com',   password_hash: passwordHash,      first_name: 'Johnny',    last_name: 'Depp',       city: 'Lausanne', date_of_birth: new Date('1963-06-09') },
  { email: 'vanessa@tindog.com',  password_hash: passwordHash,      first_name: 'Vanessa',   last_name: 'Paradis',    city: 'Lausanne', date_of_birth: new Date('1972-12-22') },
  { email: 'rihanna@tindog.com',  password_hash: passwordHash,      first_name: 'Rihanna',   last_name: 'Fendy',      city: 'Lausanne', date_of_birth: new Date('1988-02-20') },
  { email: 'asap@tindog.com',     password_hash: passwordHash,      first_name: 'Asap',      last_name: 'Rocky',      city: 'Lausanne', date_of_birth: new Date('1988-10-03') },
  { email: 'blake@tindog.com',    password_hash: passwordHash,      first_name: 'Blake',     last_name: 'Lively',     city: 'Lausanne', date_of_birth: new Date('1987-08-25') },
  { email: 'ryan@tindog.com',     password_hash: passwordHash,      first_name: 'Ryan',      last_name: 'Reynolds',   city: 'Lausanne', date_of_birth: new Date('1976-10-23') },
  { email: 'zendaya@tindog.com',  password_hash: passwordHash,      first_name: 'Zendaya',   last_name: 'Coleman',    city: 'Pully',    date_of_birth: new Date('1996-09-01') },
  { email: 'tom@tindog.com',      password_hash: passwordHash,      first_name: 'Tom',       last_name: 'Holland',    city: 'Morges',   date_of_birth: new Date('1996-06-01') },
  { email: 'angele@tindog.com',   password_hash: passwordHash,      first_name: 'Angele',    last_name: 'Van Laeken', city: 'Ecublens', date_of_birth: new Date('1995-12-03') },
  { email: 'damso@tindog.com',    password_hash: passwordHash,      first_name: 'Damso',     last_name: 'Mwamba',     city: 'Prilly',   date_of_birth: new Date('1992-07-12') },
  { email: 'emma@tindog.com',     password_hash: passwordHash,      first_name: 'Emma',      last_name: 'Watson',     city: 'Lutry',    date_of_birth: new Date('1990-04-15') },
  { email: 'daniel@tindog.com',   password_hash: passwordHash,      first_name: 'Daniel',    last_name: 'Radcliffe',  city: 'Lausanne', date_of_birth: new Date('1989-07-23') },
  { email: 'jennifer@tindog.com', password_hash: passwordHash,      first_name: 'Jennifer',  last_name: 'Lopez',      city: 'Renens',   date_of_birth: new Date('1969-07-24') },
  { email: 'drake@tindog.com',    password_hash: passwordHash,      first_name: 'Drake',     last_name: 'Graham',     city: 'Bussigny', date_of_birth: new Date('1986-10-24') },
  { email: 'ariana@tindog.com',   password_hash: passwordHash,      first_name: 'Ariana',    last_name: 'Grande',     city: 'Vevey',    date_of_birth: new Date('1993-06-26') },
  { email: 'travis@tindog.com',   password_hash: passwordHash,      first_name: 'Travis',    last_name: 'Scott',      city: 'Crissier', date_of_birth: new Date('1991-04-30') },
  { email: 'theodora@tindog.com', password_hash: passwordHash,      first_name: 'Theodora',  last_name: 'Mujinga',    city: 'Paudex',   date_of_birth: new Date('2003-10-23') },
  { email: 'sdm@tindog.com',      password_hash: passwordHash,      first_name: 'SDM',       last_name: 'Mosabu',     city: 'Lausanne', date_of_birth: new Date('1995-11-28') },
]

const dogs = [
  { dog_name: 'Surf', breed: 'Berger australien nain', age: 7, gender: 'Male', size: 'Small', bio: 'Funny looking but super nice!' },
  { dog_name: 'Joya', breed: 'Labrador', age: 2, gender: 'Female', size: 'Large', bio: 'Big but very sweet, loves to play.' },
  { dog_name: 'Rocky', breed: 'Golden Retriever', age: 4, gender: 'Male', size: 'Large', bio: 'Always happy, loves everyone.' },
  { dog_name: 'Luna', breed: 'Husky', age: 3, gender: 'Female', size: 'Medium', bio: 'Very talkative and energetic.' },
  { dog_name: 'Max', breed: 'Bouledogue français', age: 5, gender: 'Male', size: 'Small', bio: 'Lazy but adorable.' },
  { dog_name: 'Bella', breed: 'Border Collie', age: 1, gender: 'Female', size: 'Medium', bio: 'Super smart and loves to learn tricks.' },
  { dog_name: 'Charlie', breed: 'Beagle', age: 6, gender: 'Male', size: 'Small', bio: 'Nose always on the ground.' },
  { dog_name: 'Nala', breed: 'Dalmatien', age: 2, gender: 'Female', size: 'Large', bio: 'Spotted and loves to run.' },
  { dog_name: 'Oscar', breed: 'Teckel', age: 8, gender: 'Male', size: 'Small', bio: 'Old but still full of energy.' },
  { dog_name: 'Coco', breed: 'Caniche', age: 3, gender: 'Female', size: 'Small', bio: 'Fluffy and loves cuddles.' },
  { dog_name: 'Chedar', breed: 'Berger allemand', age: 4, gender: 'Male', size: 'Large', bio: 'Protective and loyal.' },
  { dog_name: 'Lily', breed: 'Bichon frisé', age: 2, gender: 'Female', size: 'Small', bio: 'Tiny but full of energy.' },
  { dog_name: 'Rex', breed: 'Rottweiler', age: 5, gender: 'Male', size: 'Large', bio: 'Big softie once you know him.' },
  { dog_name: 'Mia', breed: 'Shih Tzu', age: 3, gender: 'Female', size: 'Small', bio: 'Loves being pampered.' },
  { dog_name: 'Bruno', breed: 'Basset Hound', age: 6, gender: 'Male', size: 'Medium', bio: 'Slow but charming.' },
  { dog_name: 'Zoe', breed: 'Spitz nain', age: 1, gender: 'Female', size: 'Small', bio: 'Fluffy cloud of happiness.' },
  { dog_name: 'Thor', breed: 'Malamute', age: 4, gender: 'Male', size: 'Large', bio: 'Built for the snow and cuddles.' },
  { dog_name: 'Mila', breed: 'Berger belge', age: 2, gender: 'Female', size: 'Medium', bio: 'Smart and always ready to work.' },
  { dog_name: 'Jack', breed: 'Jack Russell', age: 5, gender: 'Male', size: 'Small', bio: 'Can outrun anyone. Seriously.' },
  { dog_name: 'Nora', breed: 'Setter irlandais', age: 3, gender: 'Female', size: 'Large', bio: 'Elegant and full of grace.' },
]

const matchingPairs = [
  // Surf(0)
  [0, 1],   // Surf & Joya
  [0, 3],   // Surf & Luna
  [0, 9],   // Surf & Coco
  // Rocky(2)
  [2, 3],   // Rocky & Luna
  [2, 4],   // Rocky & Max
  [2, 11],  // Rocky & Lily
  // Max(4)
  [4, 5],   // Max & Bella
  [4, 13],  // Max & Mia
  // Bella(5)
  [1, 5],   // Joya & Bella
  [5, 15],  // Bella & Zoe
  // Charlie(6)
  [6, 7],   // Charlie & Nala
  [6, 8],   // Charlie & Oscar
  [6, 17],  // Charlie & Mila
  // Nala(7)
  [1, 7],   // Joya & Nala
  [7, 16],  // Nala & Thor
  // Oscar(8)
  [8, 9],   // Oscar & Coco
  [8, 14],  // Oscar & Bruno
  // Coco(9)
  [9, 11],  // Coco & Lily
  // Chedar(10)
  [10, 11], // Chedar & Lily
  [10, 12], // Chedar & Rex
  [10, 16], // Chedar & Thor
  // Rex(12)
  [12, 13], // Rex & Mia
  [12, 15], // Rex & Zoe
  // Mia(13)
  [13, 19], // Mia & Nora
  // Bruno(14)
  [14, 15], // Bruno & Zoe
  [14, 18], // Bruno & Jack
  // Thor(16)
  [16, 17], // Thor & Mila
  // Mila(17)
  [17, 19], // Mila & Nora
  // Jack(18)
  [18, 19], // Jack & Nora
]

const nonMatchingPairs = [
  [0, 2, 'left', 'left'],
  [1, 4, 'right', 'left'],
  [3, 6, 'left', 'right'],
  [5, 8, 'left', 'left'],
  [7, 10, 'right', 'left'],
  [11, 14, 'left', 'right'],
  [13, 16, 'left', 'left'],
]

const sampleMessages = [
  ["Woof! 🐾", "Woof woof! 😄"],
  ["Hey cutie, wanna go to the dog park?", "Yes!! I love the dog park 🌳"],
  ["Your profile says you like fetch. Same! 🎾", "Fetch is life. Also: zoomies."],
  ["Hi! Love your breed 🐕", "Thanks! You're adorable too 😍"],
  ["My human says hi to your human 👋", "Our humans should meet for a walk!"],
]

async function main() {
  console.log('🌱 Seeding...')

  await prisma.refresh_tokens.deleteMany()
  await prisma.messages.deleteMany()
  await prisma.matches.deleteMany()
  await prisma.swipes.deleteMany()
  await prisma.dog_pics.deleteMany()
  await prisma.dogs.deleteMany()
  await prisma.users.deleteMany()

  const createdUsers = []
  for (const user of users) {
  const created = await prisma.users.create({ data: user })

    const coords = cityCoords[user.city]
    if (coords) {
      const lat = coords[0] + jitter()
      const lng = coords[1] + jitter()

      await prisma.$executeRaw`
        UPDATE users
        SET position = ST_SetSRID(ST_MakePoint(${lng}::float8, ${lat}::float8), 4326)::geography
        WHERE id = ${created.id}
      `
    } else {
      console.warn(`Ville inconnue pour ${user.first_name}: ${user.city}`)
    }

    createdUsers.push(created)
    console.log(`Created user: ${created.first_name} ${created.last_name} (${user.city})`)
  }
  

  const createdDogs = []
  for (let i = 0; i < dogs.length; i++) {
      const dog = await prisma.dogs.create({
          data: { ...dogs[i], owner_id: createdUsers[i + 1].id }
      })
      createdDogs.push(dog)
      console.log(`Created dog: ${dog.dog_name} (owner: ${createdUsers[i + 1].first_name})`)  // i+1 pas i
  }

  // Add 2 pics for the first 10 dogs
  for (let i = 0; i < dogs.length; i++) {
      await prisma.dog_pics.create({
          data: { dog_id: createdDogs[i].id, file_path: `/app/uploads/seed/${dogs[i].dog_name.toLowerCase()}-1.jpg`, mime_type: 'image/jpeg', position: 1 }
      })
      await prisma.dog_pics.create({
          data: { dog_id: createdDogs[i].id, file_path: `/app/uploads/seed/${dogs[i].dog_name.toLowerCase()}-2.jpg`, mime_type: 'image/jpeg', position: 2 }
      })
      await prisma.dog_pics.create({
          data: { dog_id: createdDogs[i].id, file_path: `/app/uploads/seed/${dogs[i].dog_name.toLowerCase()}-3.jpg`, mime_type: 'image/jpeg', position: 3 }
      })
      console.log(`Created 3 pics for ${dogs[i].dog_name}`)
  }

  for (let i = 1; i < createdUsers.length; i++) {
    const firstName = users[i].first_name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    await prisma.users.update({
        where: { id: createdUsers[i].id },
        data: { file_path: `/app/uploads/users/${firstName}.jpg`, mime_type: 'image/jpeg' }
    })
    console.log(`📸 Pic set for ${createdUsers[i].first_name}`)
}

  // Create matching swipes (right/right) + matches
  const createdMatches = []
  for (let m = 0; m < matchingPairs.length; m++) {
    const [i, j] = matchingPairs[m]
    await prisma.swipes.create({
      data: { swiper_id: createdDogs[i].id, target_id: createdDogs[j].id, direction: 'right' }
    })
    await prisma.swipes.create({
      data: { swiper_id: createdDogs[j].id, target_id: createdDogs[i].id, direction: 'right' }
    })
    const match = await prisma.matches.create({
      data: { id_dog1: createdDogs[i].id, id_dog2: createdDogs[j].id }
    })
    createdMatches.push({ match, userIndex1: i, userIndex2: j })
    console.log(`Match: ${dogs[i].dog_name} 💞 ${dogs[j].dog_name}`)
  }

  // Create non-matching swipes
  for (const [i, j, dir1, dir2] of nonMatchingPairs) {
    await prisma.swipes.create({
      data: { swiper_id: createdDogs[i].id, target_id: createdDogs[j].id, direction: dir1 }
    })
    await prisma.swipes.create({
      data: { swiper_id: createdDogs[j].id, target_id: createdDogs[i].id, direction: dir2 }
    })
    console.log(`No match: ${dogs[i].dog_name} (${dir1}) / ${dogs[j].dog_name} (${dir2})`)
  }

  // Add messages to the first 5 matches
  for (let m = 0; m < Math.min(10, createdMatches.length); m++) {
    const { match, userIndex1, userIndex2 } = createdMatches[m]
    const [msg1, msg2] = sampleMessages[m % sampleMessages.length]
    await prisma.messages.create({
        data: { match_id: match.id, sender_id: createdUsers[userIndex1 + 1].id, content: msg1 }
    })
    await prisma.messages.create({
        data: { match_id: match.id, sender_id: createdUsers[userIndex2 + 1].id, content: msg2 }
    })
    console.log(`Messages added to match ${dogs[userIndex1].dog_name} & ${dogs[userIndex2].dog_name}`)
}

const healthDocs = [
  { index: 0, dog: 'surf' },
  { index: 1, dog: 'joya' },
  { index: 2, dog: 'rocky' },
]

for (const { index, dog } of healthDocs) {
  await prisma.dogs.update({
    where: { id: createdDogs[index].id },
    data: {
      dog_formular_path: `/app/uploads/seed/health_${dog}.pdf`,
      dog_formular_type: 'application/pdf',
    }
  })
  console.log(`📄 Health record added for ${dogs[index].dog_name}`)
}

  console.log('\n✅ Done!')
  console.log(`   ${users.length} users (dont 1 admin)`)
  console.log(`   ${dogs.length} dogs`)
  console.log(`   ${dogs.length * 3} dog pics (3 par chien)`)
  console.log(`   ${users.length - 1} user profile pics`)
  console.log(`   ${matchingPairs.length} matches`)
  console.log(`   ${nonMatchingPairs.length} non-matching swipe pairs`)
  console.log(`   ${Math.min(10, matchingPairs.length) * 2} messages`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())