import { findPicsByDogId, findPicDogById, createDogPic, updateDogPic, deleteDogPic } from './dog_pics_queries.js'
import { promises as fs } from 'node:fs'
import  path  from 'node:path'
// import { fileURLToPath } from 'node:url'
import { createReadStream } from 'fs'
import { randomUUID } from 'node:crypto'

const allowedMimeType = [
  'image/jpeg',
  'image/png',
  'image/webp'
]

async function creatDirUpload() {
  try {
    const uploadDir = '/app/uploads'
    await fs.mkdir(uploadDir, { recursive : true })
    return uploadDir
  } catch (e) {
  }
}

async function saveDogPic(request) {
    const extension = path.extname(request.body.file.filename)
    const filename = randomUUID() + extension
    console.log('filname :', filename)
    console.log('mimetype:', request.body.file.mimetype)
    console.log('bytes   :', request.body.file.file.bytesRead)
    console.log('has been uploaded')
    const uploadDir = await creatDirUpload()
    const filePath = path.join(uploadDir, filename)
    return filePath
}

async function getDogPic(request, reply) {
  try {
    const pic = await findPicDogById(request.params.id)
    if (!pic)
      return reply.code(404).send({ error: 'Dog pic not found' })
    reply.type(pic.mime_type)
    return reply.send(createReadStream(pic.file_path))
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function getDogPics(request, reply) {
  try {
    const picsByDogId = await findPicsByDogId(request.params.dogId)
    if (!picsByDogId)
      return reply.code(404).send({ error: 'Dog not found' })
    const arraypicsByDog = picsByDogId.map(pic => ({
      id: pic.id,
      position: pic.position,
      url: `/api/dog-pics/${pic.id}` 
    }))
    reply.send(arraypicsByDog)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function postDogPic(request, reply) {
  try {
    if (!allowedMimeType.includes(request.body.file.mimetype))
      return reply.code(400).send({ error: 'Invalid file type' })
    const position = Number(request.body.position.value)
    if (!Number.isInteger(position) || position < 1 || position > 5)
      return reply.code(400).send({ error: 'Invalide position number' })
    const filePath = await saveDogPic(request)
    const buffer = await  request.body.file.toBuffer()
    await createDogPic(request, filePath)
    await fs.writeFile(filePath, buffer)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function putDogPic(request, reply) {
    try {
      if (!allowedMimeType.includes(request.body.file.mimetype))
        return reply.code(400).send({ error: 'Invalid file type' })
      const position = Number(request.body.position.value)
      if (!Number.isInteger(position) || position < 1 || position > 5)
        return reply.code(400).send({ error: 'Invalide position number' })
      const filePath = await saveDogPic(request)
      const buffer = await  request.body.file.toBuffer()
      await updateDogPic(request, request.params.id, filePath)
      await fs.writeFile(filePath, buffer)
    } catch (e) {
      return reply.code(500).send({ error: e.message })
    }
  }

async function removeDogPic(request, reply) {
  try {
    const pic = await findPicDogById(request.params.id)
    if (!pic)
      return reply.code(404).send({ error: 'Dog pic not found' })
    await fs.unlink(pic.file_path)
    return await deleteDogPic(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog pic not found' })
    return reply.code(500).send({ error: e.message })
  }
}

export { getDogPic, getDogPics, postDogPic, putDogPic, removeDogPic }