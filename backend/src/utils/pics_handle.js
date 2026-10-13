import { fileTypeFromBuffer } from 'file-type'
import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const allowedMimeType = [
  'image/jpeg',
  'image/png',
  'image/webp'
]

async function creatDirUpload(DirName) {
  const uploadDir = path.join('/app/', DirName)
  await fs.mkdir(uploadDir, { recursive : true })
  return uploadDir
}

async function creatFileBuffer(request) {
  const buffer = await request.body.file.toBuffer()
  const type = await fileTypeFromBuffer(buffer)
  if (!type || !allowedMimeType.includes(type.mime)) {
    const error = new Error( 'Invalid file type')
    error.statusCode = 400
    throw error
  }
  return buffer
}

async function creaFilePath(DirName, FileName) {
    const extension = path.extname(FileName)
    const filename = randomUUID() + extension
    const uploadDir = await creatDirUpload(DirName)
    const filePath = path.join(uploadDir, filename)
    return filePath
}

export { allowedMimeType, creatDirUpload, creatFileBuffer, creaFilePath }