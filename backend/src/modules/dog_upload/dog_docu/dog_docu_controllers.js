import { findDogDocuByDogId, updateDogDocu, deleteDogDocu } from './dog_docu_queries.js'
import { creatFileBuffer, creaFilePath, allowedPdfMimeType } from '../../../utils/pics_handle.js'
import { promises as fs } from 'node:fs'
import { createReadStream } from 'node:fs'

async function getDogDocu(request, reply) {
	try {
		const dog = await findDogDocuByDogId(request.params.dogId)
		if (!dog)
			return reply.code(404).send({ error: 'Dog not found' })
		if (!dog.dog_formular_path)
			return reply.code(404).send({ error: 'Dog Form not found' })
		reply.type(dog.dog_formular_type)
		return reply.send(createReadStream(dog.dog_formular_path))
	} catch (e) {
		return reply.code(500).send({ error: e.message })
	}
}

async function putDogDocu(request, reply) {
	try {
		const dog = await findDogDocuByDogId(request.params.dogId)
		if (!dog)
			return reply.code(404).send({ error: 'Dog not found' })
		const buffer = await creatFileBuffer(request, allowedPdfMimeType)
		const filePath = await creaFilePath('uploads', request.body.file.filename)
		await fs.writeFile(filePath, buffer)
		await updateDogDocu(request.params.dogId, filePath, request.body.file.mimetype)
		if (dog.dog_formular_path)
			await fs.unlink(dog.dog_formular_path)
		return reply.code(204).send({ success: true })
	} catch (e) {
		return reply.code(500).send({ error: e.message })
	}
}

async function removeDogDocu(request, reply) {
	try {
		const dog = await findDogDocuByDogId(request.params.dogId)
		if (!dog)
			return reply.code(404).send({ error: 'Dog not found' })
		if (!dog.dog_formular_path)
			return reply.code(404).send({ error: 'Dog form not found' })
		await deleteDogDocu(request.params.dogId)
		await fs.unlink(dog.dog_formular_path)
		return reply.code(204).send()
	} catch (e) {
		return reply.code(500).send({ error: e.message })
	}
}

export { getDogDocu, putDogDocu, removeDogDocu }