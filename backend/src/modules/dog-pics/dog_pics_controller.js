import { findPicsByDogId, createDogPic, deleteDogPic } from './dog_pics_queries.js'
import { promises as fs } from 'node:fs'
import  path  from 'node:path'
import { fileURLToPath } from 'node:url'

async function creatDirUpload()
{
  try {
    const _dirname =  path.dirname(fileURLToPath(import.meta.url))
    const uploadDir = path.join(_dirname, 'uploads')
    await fs.mkdir(uploadDir, { recursive : true })
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
    // const data = await request.file()
    // console.log(data.file)
    // console.log(data.filename)
    // console.log(data.mimetype)
    // const buffer = await data.toBuffer()
    await creatDirUpload()
    return reply.send({ success: true })
    // return await createDogPic(data)
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