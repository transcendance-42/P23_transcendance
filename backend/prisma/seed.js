import 'dotenv/config'
import prismaPkg from '@prisma/client'
const { PrismaClient } = prismaPkg
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const passwordHash = await bcrypt.hash('ekip', 12)

const users = [
  { email: 'parissa@tindog.com', password_hash: passwordHash, first_name: 'Parissa', last_name: 'Chatagny', city: 'Lausanne', date_of_birth: new Date('2000-09-03') },
  { email: 'davide@tindog.com', password_hash: passwordHash, first_name: 'Davide', last_name: 'Lepore', city: 'Renens', date_of_birth: new Date('2000-07-15') },
  { email: 'jonathan@tindog.com', password_hash: passwordHash, first_name: 'Jonathan', last_name: 'Rime', city: 'Lausanne', date_of_birth: new Date('1998-11-10') },
  { email: 'laetitia@tindog.com', password_hash: passwordHash, first_name: 'Laetitia', last_name: 'Rey', city: 'Mont-sur-Lausanne', date_of_birth: new Date('2000-10-09') },
  { email: 'chaely@tindog.com', password_hash: passwordHash, first_name: 'Chaely', last_name: 'Baudhuin', city: 'Gland', date_of_birth: new Date('2001-01-10') },
  { email: 'alice@tindog.com', password_hash: passwordHash, first_name: 'Alice', last_name: 'Dupont', city: 'Genève', date_of_birth: new Date('1999-03-22') },
  { email: 'marc@tindog.com', password_hash: passwordHash, first_name: 'Marc', last_name: 'Bernard', city: 'Zürich', date_of_birth: new Date('1997-06-14') },
  { email: 'sophie@tindog.com', password_hash: passwordHash, first_name: 'Sophie', last_name: 'Martin', city: 'Berne', date_of_birth: new Date('2002-12-01') },
  { email: 'luca@tindog.com', password_hash: passwordHash, first_name: 'Luca', last_name: 'Rossi', city: 'Lugano', date_of_birth: new Date('1996-08-30') },
  { email: 'emma@tindog.com', password_hash: passwordHash, first_name: 'Emma', last_name: 'Müller', city: 'Bâle', date_of_birth: new Date('2001-05-17') },
  { email: 'thomas@tindog.com', password_hash: passwordHash, first_name: 'Thomas', last_name: 'Blanc', city: 'Fribourg', date_of_birth: new Date('1998-02-28') },
  { email: 'julie@tindog.com', password_hash: passwordHash, first_name: 'Julie', last_name: 'Morel', city: 'Neuchâtel', date_of_birth: new Date('2000-07-04') },
  { email: 'kevin@tindog.com', password_hash: passwordHash, first_name: 'Kevin', last_name: 'Favre', city: 'Sion', date_of_birth: new Date('1999-11-19') },
  { email: 'clara@tindog.com', password_hash: passwordHash, first_name: 'Clara', last_name: 'Leroy', city: 'Lausanne', date_of_birth: new Date('2003-04-08') },
  { email: 'noe@tindog.com', password_hash: passwordHash, first_name: 'Noé', last_name: 'Simon', city: 'Genève', date_of_birth: new Date('1997-09-25') },
  { email: 'camille@tindog.com', password_hash: passwordHash, first_name: 'Camille', last_name: 'Girard', city: 'Renens', date_of_birth: new Date('2001-01-30') },
  { email: 'hugo@tindog.com', password_hash: passwordHash, first_name: 'Hugo', last_name: 'Petit', city: 'Zürich', date_of_birth: new Date('1996-03-12') },
  { email: 'lea@tindog.com', password_hash: passwordHash, first_name: 'Léa', last_name: 'Roux', city: 'Berne', date_of_birth: new Date('2002-06-21') },
  { email: 'maxime@tindog.com', password_hash: passwordHash, first_name: 'Maxime', last_name: 'Lambert', city: 'Genève', date_of_birth: new Date('1998-10-03') },
  { email: 'sarah@tindog.com', password_hash: passwordHash, first_name: 'Sarah', last_name: 'Bonnet', city: 'Lausanne', date_of_birth: new Date('2000-12-15') },
  { email: 'antoine@tindog.com', password_hash: passwordHash, first_name: 'Antoine', last_name: 'Perrin', city: 'Genève', date_of_birth: new Date('1999-04-12') },
  { email: 'manon@tindog.com', password_hash: passwordHash, first_name: 'Manon', last_name: 'Chevalier', city: 'Lausanne', date_of_birth: new Date('2001-08-22') },
  { email: 'romain@tindog.com', password_hash: passwordHash, first_name: 'Romain', last_name: 'Fournier', city: 'Zürich', date_of_birth: new Date('1997-02-14') },
  { email: 'elodie@tindog.com', password_hash: passwordHash, first_name: 'Élodie', last_name: 'Rousseau', city: 'Berne', date_of_birth: new Date('2000-06-30') },
  { email: 'pierre@tindog.com', password_hash: passwordHash, first_name: 'Pierre', last_name: 'Mercier', city: 'Fribourg', date_of_birth: new Date('1996-11-05') },
  { email: 'laura@tindog.com', password_hash: passwordHash, first_name: 'Laura', last_name: 'Dupuis', city: 'Genève', date_of_birth: new Date('2002-03-18') },
  { email: 'nicolas@tindog.com', password_hash: passwordHash, first_name: 'Nicolas', last_name: 'Moreau', city: 'Lausanne', date_of_birth: new Date('1998-07-25') },
  { email: 'chloe@tindog.com', password_hash: passwordHash, first_name: 'Chloé', last_name: 'Laurent', city: 'Zürich', date_of_birth: new Date('2001-12-08') },
  { email: 'florian@tindog.com', password_hash: passwordHash, first_name: 'Florian', last_name: 'Simon', city: 'Lugano', date_of_birth: new Date('1997-05-20') },
  { email: 'pauline@tindog.com', password_hash: passwordHash, first_name: 'Pauline', last_name: 'Michel', city: 'Bâle', date_of_birth: new Date('2000-01-14') },
  { email: 'quentin@tindog.com', password_hash: passwordHash, first_name: 'Quentin', last_name: 'Garcia', city: 'Lausanne', date_of_birth: new Date('1999-09-02') },
  { email: 'marine@tindog.com', password_hash: passwordHash, first_name: 'Marine', last_name: 'David', city: 'Genève', date_of_birth: new Date('2002-05-16') },
  { email: 'alexis@tindog.com', password_hash: passwordHash, first_name: 'Alexis', last_name: 'Bertrand', city: 'Renens', date_of_birth: new Date('1996-08-11') },
  { email: 'lucie@tindog.com', password_hash: passwordHash, first_name: 'Lucie', last_name: 'Thomas', city: 'Zürich', date_of_birth: new Date('2001-02-28') },
  { email: 'baptiste@tindog.com', password_hash: passwordHash, first_name: 'Baptiste', last_name: 'Robert', city: 'Berne', date_of_birth: new Date('1998-04-07') },
  { email: 'ines@tindog.com', password_hash: passwordHash, first_name: 'Inès', last_name: 'Richard', city: 'Fribourg', date_of_birth: new Date('2000-10-23') },
  { email: 'gabriel@tindog.com', password_hash: passwordHash, first_name: 'Gabriel', last_name: 'Dumont', city: 'Genève', date_of_birth: new Date('1997-01-19') },
  { email: 'amelie@tindog.com', password_hash: passwordHash, first_name: 'Amélie', last_name: 'Lefevre', city: 'Lausanne', date_of_birth: new Date('2003-07-31') },
  { email: 'vincent@tindog.com', password_hash: passwordHash, first_name: 'Vincent', last_name: 'Giraud', city: 'Zürich', date_of_birth: new Date('1995-03-06') },
  { email: 'charlotte@tindog.com', password_hash: passwordHash, first_name: 'Charlotte', last_name: 'Picard', city: 'Bâle', date_of_birth: new Date('2001-11-14') },
  { email: 'sebastien@tindog.com', password_hash: passwordHash, first_name: 'Sébastien', last_name: 'Leclerc', city: 'Lugano', date_of_birth: new Date('1998-06-09') },
  { email: 'celine@tindog.com', password_hash: passwordHash, first_name: 'Céline', last_name: 'Fontaine', city: 'Lausanne', date_of_birth: new Date('2000-08-17') },
  { email: 'matthieu@tindog.com', password_hash: passwordHash, first_name: 'Matthieu', last_name: 'Henry', city: 'Genève', date_of_birth: new Date('1996-12-03') },
  { email: 'elena@tindog.com', password_hash: passwordHash, first_name: 'Elena', last_name: 'Muller', city: 'Berne', date_of_birth: new Date('2002-04-25') },
  { email: 'jeremy@tindog.com', password_hash: passwordHash, first_name: 'Jérémy', last_name: 'Roussel', city: 'Fribourg', date_of_birth: new Date('1999-02-11') },
  { email: 'noemie@tindog.com', password_hash: passwordHash, first_name: 'Noémie', last_name: 'Barbier', city: 'Zürich', date_of_birth: new Date('2001-06-05') },
  { email: 'cedric@tindog.com', password_hash: passwordHash, first_name: 'Cédric', last_name: 'Arnaud', city: 'Renens', date_of_birth: new Date('1997-10-28') },
  { email: 'margot@tindog.com', password_hash: passwordHash, first_name: 'Margot', last_name: 'Collin', city: 'Lausanne', date_of_birth: new Date('2003-01-20') },
  { email: 'thibault@tindog.com', password_hash: passwordHash, first_name: 'Thibault', last_name: 'Gaillard', city: 'Genève', date_of_birth: new Date('1998-09-15') },
  { email: 'oceane@tindog.com', password_hash: passwordHash, first_name: 'Océane', last_name: 'Renard', city: 'Bâle', date_of_birth: new Date('2000-03-09') },
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
  { dog_name: 'Zeus', breed: 'Berger allemand', age: 4, gender: 'Male', size: 'Large', bio: 'Protective and loyal.' },
  { dog_name: 'Lily', breed: 'Bichon frisé', age: 2, gender: 'Female', size: 'Small', bio: 'Tiny but full of energy.' },
  { dog_name: 'Rex', breed: 'Rottweiler', age: 5, gender: 'Male', size: 'Large', bio: 'Big softie once you know him.' },
  { dog_name: 'Mia', breed: 'Shih Tzu', age: 3, gender: 'Female', size: 'Small', bio: 'Loves being pampered.' },
  { dog_name: 'Bruno', breed: 'Basset Hound', age: 6, gender: 'Male', size: 'Medium', bio: 'Slow but charming.' },
  { dog_name: 'Zoe', breed: 'Spitz nain', age: 1, gender: 'Female', size: 'Small', bio: 'Fluffy cloud of happiness.' },
  { dog_name: 'Thor', breed: 'Malamute', age: 4, gender: 'Male', size: 'Large', bio: 'Built for the snow and cuddles.' },
  { dog_name: 'Mila', breed: 'Berger belge', age: 2, gender: 'Female', size: 'Medium', bio: 'Smart and always ready to work.' },
  { dog_name: 'Jack', breed: 'Jack Russell', age: 5, gender: 'Male', size: 'Small', bio: 'Can outrun anyone. Seriously.' },
  { dog_name: 'Nora', breed: 'Setter irlandais', age: 3, gender: 'Female', size: 'Large', bio: 'Elegant and full of grace.' },
  { dog_name: 'Milo', breed: 'Carlin', age: 4, gender: 'Male', size: 'Small', bio: 'Snores loudly but is very cute.' },
  { dog_name: 'Daisy', breed: 'Cocker anglais', age: 2, gender: 'Female', size: 'Medium', bio: 'Always happy to see you.' },
  { dog_name: 'Simba', breed: 'Akita', age: 6, gender: 'Male', size: 'Large', bio: 'Majestic and calm.' },
  { dog_name: 'Lola', breed: 'Chihuahua', age: 1, gender: 'Female', size: 'Small', bio: 'Small dog, big attitude.' },
  { dog_name: 'Duke', breed: 'Weimaraner', age: 3, gender: 'Male', size: 'Large', bio: 'Sleek and fast.' },
  { dog_name: 'Sasha', breed: 'Samoyède', age: 2, gender: 'Female', size: 'Large', bio: 'Permanent smile guaranteed.' },
  { dog_name: 'Buddy', breed: 'Boxer', age: 5, gender: 'Male', size: 'Large', bio: 'Bouncy and fun.' },
  { dog_name: 'Rosie', breed: 'Cavalier King Charles', age: 3, gender: 'Female', size: 'Small', bio: 'Gentle and loves laps.' },
  { dog_name: 'Gus', breed: 'Chow Chow', age: 4, gender: 'Male', size: 'Medium', bio: 'Fluffy lion vibes.' },
  { dog_name: 'Freya', breed: 'Lévrier', age: 2, gender: 'Female', size: 'Large', bio: 'Fast outside, lazy at home.' },
  { dog_name: 'Archie', breed: 'Schnauzer nain', age: 5, gender: 'Male', size: 'Small', bio: 'Bushy eyebrows, big personality.' },
  { dog_name: 'Ruby', breed: 'Golden Retriever', age: 1, gender: 'Female', size: 'Large', bio: 'Pure sunshine in dog form.' },
  { dog_name: 'Bear', breed: 'Terre-Neuve', age: 6, gender: 'Male', size: 'Large', bio: 'Gentle giant who loves water.' },
  { dog_name: 'Stella', breed: 'Dalmatien', age: 2, gender: 'Female', size: 'Large', bio: 'Spotted and speedy.' },
  { dog_name: 'Finn', breed: 'Berger australien', age: 3, gender: 'Male', size: 'Medium', bio: 'Herds everything he sees.' },
  { dog_name: 'Penny', breed: 'Labrador', age: 4, gender: 'Female', size: 'Large', bio: 'Obsessed with fetch.' },
  { dog_name: 'Leo', breed: 'Leonberg', age: 5, gender: 'Male', size: 'Large', bio: 'Looks like a lion, acts like a puppy.' },
  { dog_name: 'Willow', breed: 'Whippet', age: 2, gender: 'Female', size: 'Medium', bio: 'Elegant sprinter.' },
  { dog_name: 'Buster', breed: 'Bulldog anglais', age: 4, gender: 'Male', size: 'Medium', bio: 'Wrinkly and wonderful.' },
  { dog_name: 'Ivy', breed: 'Border Terrier', age: 1, gender: 'Female', size: 'Small', bio: 'Scruffy and fearless.' },
  { dog_name: 'Atlas', breed: 'Bouvier bernois', age: 3, gender: 'Male', size: 'Large', bio: 'Mountain dog at heart.' },
  { dog_name: 'Hazel', breed: 'Épagneul breton', age: 2, gender: 'Female', size: 'Medium', bio: 'Loves fields and adventures.' },
  { dog_name: 'Enzo', breed: 'Dobermann', age: 4, gender: 'Male', size: 'Large', bio: 'Sleek, fast, and loyal.' },
  { dog_name: 'Poppy', breed: 'Beagle', age: 3, gender: 'Female', size: 'Small', bio: 'Nose first, questions later.' },
  { dog_name: 'Ranger', breed: 'Malinois', age: 5, gender: 'Male', size: 'Large', bio: 'High energy, always on duty.' },
  { dog_name: 'Cleo', breed: 'Basenji', age: 2, gender: 'Female', size: 'Medium', bio: "The dog that doesn't bark." },
  { dog_name: 'Moose', breed: 'Labradoodle', age: 4, gender: 'Male', size: 'Large', bio: 'Half floof, half chaos.' },
  { dog_name: 'Aurora', breed: 'Husky sibérien', age: 1, gender: 'Female', size: 'Medium', bio: 'Howls at everything.' },
  { dog_name: 'Chester', breed: 'Fox Terrier', age: 6, gender: 'Male', size: 'Small', bio: 'Feisty and fun.' },
  { dog_name: 'Amber', breed: 'Golden Retriever', age: 3, gender: 'Female', size: 'Large', bio: 'Golden inside and out.' },
]

// Pairs that will MATCH (right + right) — indices into createdDogs
const matchingPairs = [
  [0, 1],   // Surf & Joya
  [2, 3],   // Rocky & Luna
  [4, 5],   // Max & Bella
  [6, 7],   // Charlie & Nala
  [8, 9],   // Oscar & Coco
  [10, 11], // Zeus & Lily
  [12, 13], // Rex & Mia
]

// Pairs with NO match (left or asymmetric)
const nonMatchingPairs = [
  [0, 2, 'left', 'left'],
  [1, 4, 'right', 'left'],
  [3, 6, 'left', 'right'],
  [5, 8, 'left', 'left'],
  [7, 10, 'right', 'left'],
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

  // Clean all tables in order (respect FK constraints)
  await prisma.messages.deleteMany()
  await prisma.matches.deleteMany()
  await prisma.swipes.deleteMany()
  await prisma.dog_pics.deleteMany()
  await prisma.dogs.deleteMany()
  await prisma.users.deleteMany()

  // Create 50 users
  const createdUsers = []
  for (const user of users) {
    const created = await prisma.users.create({ data: user })
    createdUsers.push(created)
    console.log(`Created user: ${created.first_name} ${created.last_name}`)
  }

  // Create 50 dogs (one per user)
  const createdDogs = []
  for (let i = 0; i < dogs.length; i++) {
    const dog = await prisma.dogs.create({
      data: { ...dogs[i], owner_id: createdUsers[i].id }
    })
    createdDogs.push(dog)
    console.log(`Created dog: ${dog.dog_name} (owner: ${createdUsers[i].first_name})`)
  }

  // Add 2 pics for the first 5 dogs
  for (let i = 0; i < 5; i++) {
    await prisma.dog_pics.create({
      data: { dog_id: createdDogs[i].id, file_path: `/uploads/${dogs[i].dog_name.toLowerCase()}-1.jpg`, position: 1 }
    })
    await prisma.dog_pics.create({
      data: { dog_id: createdDogs[i].id, file_path: `/uploads/${dogs[i].dog_name.toLowerCase()}-2.jpg`, position: 2 }
    })
    console.log(`Created 2 pics for ${dogs[i].dog_name}`)
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
  for (let m = 0; m < 5; m++) {
    const { match, userIndex1, userIndex2 } = createdMatches[m]
    const [msg1, msg2] = sampleMessages[m]
    await prisma.messages.create({
      data: { match_id: match.id, sender_id: createdUsers[userIndex1].id, content: msg1 }
    })
    await prisma.messages.create({
      data: { match_id: match.id, sender_id: createdUsers[userIndex2].id, content: msg2 }
    })
    console.log(`Messages added to match ${dogs[userIndex1].dog_name} & ${dogs[userIndex2].dog_name}`)
  }

  console.log('\n✅ Done!')
  console.log(`   ${users.length} users`)
  console.log(`   ${dogs.length} dogs`)
  console.log(`   10 dog pics (first 5 dogs, 2 each)`)
  console.log(`   ${matchingPairs.length} matches`)
  console.log(`   ${nonMatchingPairs.length} non-matching swipe pairs`)
  console.log(`   10 messages (in first 5 matches)`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())