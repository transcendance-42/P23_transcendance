import { findPicsByDogId, findPicDogById, createDogPic, updateDogPic, deleteDogPic } from './dog_pics_queries.js'
import { creatFileBuffer, creaFilePath, allowedImagesMimeType, allowedPdfMimeType } from '../../../utils/pics_handle.js'
import { promises as fs } from 'node:fs'
import { createReadStream } from 'fs'
import { AppError } from '../../../error.js'

async function getDogPic(request, reply) {
    const pic = await findPicDogById(request.params.id)
    if (!pic)
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
    const newPic = await createDogPic(request, filePath)
    await fs.writeFile(filePath, buffer)
    return reply.send(newPic)
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
    await fs.unlink(pic.file_path)
    await deleteDogPic(request.params.id)
    return { success: true }
}

async function getDogForm(request, reply) {
    const pic = await findPicDogById(request.params.id)
    if (!pic)
      throw new AppError(404, 'NOT_FOUND', 'Dog pic not found')
    reply.type(pic.mime_type)
    return reply.send(createReadStream(pic.file_path))
}

export { getDogPic, getDogPics, postDogPic, removeDogPic }