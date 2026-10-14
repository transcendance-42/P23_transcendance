import { findDogFormByDogId, updateDogFormular, deleteDogFormular } from './dog_form_queries.js'
import { creatFileBuffer, creaFilePath, allowedPdfMimeType } from '../../utils/pics_handle.js'
import { promises as fs } from 'node:fs'
import { createReadStream } from 'node:fs'

async function getDogForm(request, reply) {
	try {
		const dog = await findDogFormByDogId(request.params.dogId)
		if (!dog)
			return reply.code(404).send({ error: 'Dog not found' })
		reply.type(dog.dog_formular_type)
		return reply.send(createReadStream(dog.dog_formular_path))
		} catch (e) {
		return reply.code(500).send({ error: e.message })
	}
}

async function putDogForm(request, reply) {
	try {
		const dog = await findDogFormByDogId(request.params.dogId)
		if (!dog)
			return reply.code(404).send({ error: 'Dog not found' })
		const buffer = await creatFileBuffer(request, allowedPdfMimeType)
		const filePath = await creaFilePath('uploads', request.body.file.filename)
		await fs.writeFile(filePath, buffer)
		await updateDogFormular(request.params.dogId, filePath)
		if (dog.dog_formular_path)
			await fs.unlink(dog.dog_formular_path)
		return reply.code(204).send({ success: true })
		} catch (e) {
		return reply.code(e.statusCode || 500).send({ error: e.message })
	}
}

export { getDogForm,  }