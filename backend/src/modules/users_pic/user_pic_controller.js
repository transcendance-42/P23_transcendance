import { updateUserPic, findPicPathByUserId, deleteUserPic } from './user_pic_query.js'
import { creatFileBuffer, creaFilePath, allowedImagesMimeType, allowedPdfMimeType } from '../../utils/pics_handle.js'
import { promises as fs } from 'node:fs'
import { createReadStream, existsSync } from 'fs'

async function getUserPic(request, reply) {
    try {
        const picPath = await findPicPathByUserId(request.params.id)
        if (!picPath || !existsSync(picPath.file_path))
            return reply.code(404).send({ error: 'User pic not found' })
        reply.type(picPath.mime_type)
        return reply.send(createReadStream(picPath.file_path))
    } catch (e) {
        return reply.code(500).send({ error: e.message })
    }
}

async function putUserPic(request, reply) {
    try {
        const buffer = await creatFileBuffer(request, allowedImagesMimeType)
        const oldPic = await findPicPathByUserId(request.userId)
        const filePath = await creaFilePath('uploads', request.body.file.filename)
        await fs.writeFile(filePath, buffer)
        await updateUserPic(request, filePath)
        if (oldPic && oldPic.file_path)
            await fs.unlink(oldPic.file_path)
        return reply.code(200).send({ message: 'User pic updated' })
    } catch (e) {
        return reply.code(500).send({ error: 'Internal server error' })
    }
}

async function removeUserPic(request, reply) {
	try {
		const picPath = await findPicPathByUserId(request.params.id)
		if (!picPath)
			return reply.code(404).send({ error: 'User pic not found' })
		await fs.unlink(picPath.file_path)
		await deleteUserPic(request.params.id)
		return { success: true }
	} catch (e) {
		return reply.code(500).send({ error: e.message })
	}
}

export { getUserPic, putUserPic, removeUserPic }