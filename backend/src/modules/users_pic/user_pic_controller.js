import { updateUserPic, findPicPathByUserId, deleteUserPic } from './user_pic_query.js'
import { creatFileBuffer, creaFilePath, allowedImagesMimeType, allowedPdfMimeType } from '../../utils/pics_handle.js'
import { promises as fs } from 'node:fs'
import { createReadStream, existsSync } from 'fs'
import { AppError } from '../../error.js'

async function getUserPic(request, reply) {
	const picPath = await findPicPathByUserId(request.params.id)
	if (!picPath || !picPath.file_path)
		throw new AppError(404, 'NOT_FOUND', 'User pic not found')
	reply.type(picPath.mime_type)
	return reply.send(createReadStream(picPath.file_path))
}

async function putUserPic(request, reply) {
	const buffer = await creatFileBuffer(request, allowedImagesMimeType)
	const oldPic = await findPicPathByUserId(request.userId)
	const filePath = await creaFilePath('uploads', request.body.file.filename)
	try {
		await fs.writeFile(filePath, buffer)
		await updateUserPic(request, filePath)
	} catch (e) {
		try {
			await fs.unlink(filePath)
		} catch (cleanErr) {
			request.log.error({ err: cleanErr, filePath })
		}
		throw new AppError(500, 'INTERNAL_SERVER_ERROR', 'Internal server error')
	}
	if (oldPic && oldPic.file_path) {
		try {
			await fs.unlink(oldPic.file_path)
		} catch (err) {
			request.log.error({ err, path: oldPic.file_path }, 'old file cleanup failed')
		}
	}
	return reply.code(204).send()
}

async function removeUserPic(request, reply) {
	const picPath = await findPicPathByUserId(request.params.id)
	if (!picPath)
		throw new AppError(404, 'NOT_FOUND', 'User pic not found')
	await deleteUserPic(request.params.id)
	try {
		await fs.unlink(picPath.file_path)
	} catch (e) {
		request.log.error({ e, path: picPath.file_path }, 'file cleanup failed')
	}
	return reply.code(204).send()
}

export { getUserPic, putUserPic, removeUserPic }