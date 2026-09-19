import { findPicsByDogId, createDogPic, deleteDogPic } from './dog_pics_queries.js'
import { promises as fs } from 'node:fs'
import  path  from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'stream/promises';

async function creatDirUpload()
{
  try {
    const _dirname =  path.dirname(fileURLToPath(import.meta.url))
    const uploadDir = path.join(_dirname, 'uploads')
    await fs.mkdir(uploadDir, { recursive : true })
    return uploadDir
  } catch (e) {
  }
}

async function getDogPics(request, reply) {
  try {
    return await findPicsByDogId(request.params.dogId)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function postDogPic(request, reply) {
  try {
    console.log('filname :', request.body.file.filename)
    console.log('mimetype:', request.body.file.mimetype)
    console.log('bytes   :', request.body.file.file.bytesRead)
    const uploadDir = await creatDirUpload()
    const filePath = path.join(uploadDir, request.body.file.filename)
    // reply.send({ success: true })
    const buffer = await  request.body.file.toBuffer()
    await fs.writeFile(filePath, buffer)
    await createDogPic(request, filePath)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function removeDogPic(request, reply) {
  try {
    return await deleteDogPic(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog pic not found' })
    return reply.code(500).send({ error: e.message })
  }
}

export { getDogPics, postDogPic, removeDogPic }