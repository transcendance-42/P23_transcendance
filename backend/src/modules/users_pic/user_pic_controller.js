import { creatUserPic } from './user_pic_query.js'
import { creatFileBuffer, creaFilePath } from '../../utils/pics_handle.js'
import { promises as fs } from 'node:fs'

async function postUserPic(request, reply) {
	try {
		const buffer = await creatFileBuffer(request)
		const filePath = await creaFilePath('uploads', request.body.file.filename)
		await creatUserPic(request, filePath)
		await fs.writeFile(filePath, buffer)
	} catch (e) {
		return reply.code(500).send({ error: e.message })
	}
}

export { postUserPic }