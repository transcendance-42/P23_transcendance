import { findPicsByDogId, findPicDogById, createDogPic, updateDogPic, deleteDogPic } from './dog_pics_queries.js'
import { creatFileBuffer, creaFilePath, allowedImagesMimeType, allowedPdfMimeType } from '../../../utils/pics_handle.js'
import { promises as fs } from 'node:fs'
import { createReadStream } from 'fs'
import { AppError } from '../../../error.js'
import { dogUploadsRoutes } from '../dog_upload_routes.js'

async function getDogPic(request, reply) {
    const pic = await findPicDogById(request.params.id)
    if (!pic || !pic.file_path)
      throw new AppError(404, 'NOT_FOUND', 'Dog Pic not found')
    reply.type(pic.mime_type)
    return reply.send(createReadStream(pic.file_path))
}

async function getDogPics(request, reply) {
    const picsByDogId = await findPicsByDogId(request.params.id)
    if (!picsByDogId)
      throw new AppError(404, 'NOT_FOUND', 'Dog not found')
    const arraypicsByDog = picsByDogId.map(pic => ({
      id: pic.id,
      position: pic.position,
      url: `/api/dog-pics/${pic.id}` 
    }))
    reply.send(arraypicsByDog)
}

async function postDogPic(request, reply) {
    const buffer = await creatFileBuffer(request, allowedImagesMimeType)
    const filePath = await creaFilePath('uploads', request.body.file.filename)
    await fs.writeFile(filePath, buffer)
    let newPic
    try {
      newPic = await createDogPic(request, filePath)
    } catch (e) {
      try {
        await fs.unlink(filePath)
      } catch (err) {
          request.log.error({ err, path: filePath }, 'old file cleanup failed')
      }
      throw new AppError(500, 'INTERNAL_SERVER_ERROR', 'Internal server error')
    }
    return reply.code(201).send(newPic)
}

// unused par le front
// async function putDogPic(request, reply) {
//     const buffer = await creatFileBuffer(request, allowedImagesMimeType)
//     const fileToUpdate = await findPicDogById(request.params.id)
//     if (!fileToUpdate)
//       throw new AppError(404, 'NOT_FOUND', 'Dog pic not found')
//     console.log('filname :', request.body.file.filename)
//     console.log('mimetype:', request.body.file.mimetype)
//     console.log('bytes   :', request.body.file.file.bytesRead)
//     console.log('has been uploaded')
//     await updateDogPic(request, request.params.id, fileToUpdate.file_path)
//     await fs.writeFile(fileToUpdate.file_path, buffer)
// }

async function removeDogPic(request, reply) {
  const pic = await findPicDogById(request.params.id)
  if (!pic)
    throw new AppError(404, 'NOT_FOUND', 'Dog pic not found')
  await deleteDogPic(request.params.id)
  try {
    await fs.unlink(pic.file_path)
  } catch (e) {
    request.log.error({ e, path: pic.file_path }, 'file cleanup failed')
  }
  return reply.code(204).send()
}

export { getDogPic, getDogPics, postDogPic, removeDogPic }