import { fileTypeFromBuffer } from 'file-type'
import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { AppError } from '../error.js'

const allowedImagesMimeType = [
  'image/jpeg',
  'image/png',
  'image/webp'
]

const allowedPdfMimeType = [
  'application/pdf'
]

async function creatDirUpload(DirName) {
  const uploadDir = path.join('/app/', DirName)
  await fs.mkdir(uploadDir, { recursive : true })
  return uploadDir
}

async function creatFileBuffer(request, allowType) {
  const buffer = await request.body.file.toBuffer()
  const type = await fileTypeFromBuffer(buffer)
  if (!type || !allowType.includes(type.mime)) {
    throw new AppError(400, 'INVALID_FILE_TYPE', 'Invalid file type')
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

export { creatDirUpload, creatFileBuffer, creaFilePath, allowedImagesMimeType, allowedPdfMimeType }