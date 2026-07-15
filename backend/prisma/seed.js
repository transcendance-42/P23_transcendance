require('dotenv').config()
const { PrismaClient } = require('../src/generated/prisma')
const { PrismaPg } = require('@prisma/adapter-pg')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const users = [
  { email: 'parissa@pawmatch.com', first_name: 'Parissa', last_name: 'Chatagny', city: 'Lausanne', date_of_birth: new Date('2000-09-03') },
  { email: 'davide@pawmatch.com', first_name: 'Davide', last_name: 'Lepore', city: 'Renens', date_of_birth: new Date('2000-07-15') },
  { email: 'jonathan@pawmatch.com', first_name: 'Jonathan', last_name: 'Rime', city: 'Lausanne', date_of_birth: new Date('1998-11-10') },
  { email: 'laetitia@pawmatch.com', first_name: 'Laetitia', last_name: 'Rey', city: 'Mont-sur-Lausanne', date_of_birth: new Date('2000-10-09') },
  { email: 'chaely@pawmatch.com', first_name: 'Chaely', last_name: 'Baudhuin', city: 'Gland', date_of_birth: new Date('2001-01-10') },
  { email: 'alice@pawmatch.com', first_name: 'Alice', last_name: 'Dupont', city: 'Genève', date_of_birth: new Date('1999-03-22') },
  { email: 'marc@pawmatch.com', first_name: 'Marc', last_name: 'Bernard', city: 'Zürich', date_of_birth: new Date('1997-06-14') },
  { email: 'sophie@pawmatch.com', first_name: 'Sophie', last_name: 'Martin', city: 'Berne', date_of_birth: new Date('2002-12-01') },
  { email: 'luca@pawmatch.com', first_name: 'Luca', last_name: 'Rossi', city: 'Lugano', date_of_birth: new Date('1996-08-30') },
  { email: 'emma@pawmatch.com', first_name: 'Emma', last_name: 'Müller', city: 'Bâle', date_of_birth: new Date('2001-05-17') },
  { email: 'thomas@pawmatch.com', first_name: 'Thomas', last_name: 'Blanc', city: 'Fribourg', date_of_birth: new Date('1998-02-28') },
  { email: 'julie@pawmatch.com', first_name: 'Julie', last_name: 'Morel', city: 'Neuchâtel', date_of_birth: new Date('2000-07-04') },
  { email: 'kevin@pawmatch.com', first_name: 'Kevin', last_name: 'Favre', city: 'Sion', date_of_birth: new Date('1999-11-19') },
  { email: 'clara@pawmatch.com', first_name: 'Clara', last_name: 'Leroy', city: 'Lausanne', date_of_birth: new Date('2003-04-08') },
  { email: 'noe@pawmatch.com', first_name: 'Noé', last_name: 'Simon', city: 'Genève', date_of_birth: new Date('1997-09-25') },
  { email: 'camille@pawmatch.com', first_name: 'Camille', last_name: 'Girard', city: 'Renens', date_of_birth: new Date('2001-01-30') },
  { email: 'hugo@pawmatch.com', first_name: 'Hugo', last_name: 'Petit', city: 'Zürich', date_of_birth: new Date('1996-03-12') },
  { email: 'lea@pawmatch.com', first_name: 'Léa', last_name: 'Roux', city: 'Berne', date_of_birth: new Date('2002-06-21') },
  { email: 'maxime@pawmatch.com', first_name: 'Maxime', last_name: 'Lambert', city: 'Genève', date_of_birth: new Date('1998-10-03') },
  { email: 'sarah@pawmatch.com', first_name: 'Sarah', last_name: 'Bonnet', city: 'Lausanne', date_of_birth: new Date('2000-12-15') },
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
]

async function main() {
  console.log('Seeding...')

  
  await prisma.messages.deleteMany()
  await prisma.matches.deleteMany()
  await prisma.swipes.deleteMany()
  await prisma.dog_pics.deleteMany()
  await prisma.dogs.deleteMany()
  await prisma.users.deleteMany()

  // Create 20 users
  const createdUsers = []
  for (const user of users) {
    const created = await prisma.users.create({ data: user })
    createdUsers.push(created)
    console.log(`Created user: ${created.first_name} ${created.last_name}`)
  }

  // Create 10 dogs for the first 10 users
  const createdDogs = []
  for (let i = 0; i < 10; i++) {
    const dog = await prisma.dogs.create({
      data: {
        ...dogs[i],
        owner_id: createdUsers[i].id,
      }
    })
    createdDogs.push(dog)
    console.log(`Created dog: ${dog.dog_name} (owner: ${createdUsers[i].first_name})`)
  }

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
