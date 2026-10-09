import { promises as fs } from 'node:fs'
import path from 'node:path'

const allowedMimeType = [
  'image/jpeg',
  'image/png',
  'image/webp'
]

async function creatDirUpload(name) {
  const uploadDir = path.join('/app/', name)
  await fs.mkdir(uploadDir, { recursive : true })
  return uploadDir
}

async function controleTypeBuff(request) {
  const buffer = await request.body.file.toBuffer()
  const type = await fileTypeFromBuffer(buffer)
  if (!type || !allowedMimeType.includes(type.mime))
    return reply.code(400).send({ error: 'Invalid file type' })
}

export { allowedMimeType, creatDirUpload, controleTypeBuff }