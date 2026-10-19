import { findDogDocuByDogId, updateDogDocu, deleteDogDocu } from './dog_docu_queries.js'
import { creatFileBuffer, creaFilePath, allowedPdfMimeType } from '../../../utils/pics_handle.js'
import { promises as fs } from 'node:fs'
import { createReadStream } from 'node:fs'
import { AppError } from '../../../error.js'

async function getDogDocu(request, reply) {
	const dog = await findDogDocuByDogId(request.params.dogId)
	if (!dog)
		throw new AppError(404, 'NOT_FOUND', 'Dog not found')
	if (!dog.dog_formular_path)
		throw new AppError(404, 'NOT_FOUND', 'Dog form not found')
	reply.type(dog.dog_formular_type)
	return reply.send(createReadStream(dog.dog_formular_path))
}

async function putDogDocu(request, reply) {
	const dog = await findDogDocuByDogId(request.params.dogId)
	if (!dog)
		throw new AppError(404, 'NOT_FOUND', 'Dog not found')
	const buffer = await creatFileBuffer(request, allowedPdfMimeType)
	const filePath = await creaFilePath('uploads', request.body.file.filename)
	await fs.writeFile(filePath, buffer)
	await updateDogDocu(request.params.dogId, filePath, request.body.file.mimetype)
	if (dog.dog_formular_path)
		await fs.unlink(dog.dog_formular_path)
	return reply.code(204).send()
}

async function removeDogDocu(request, reply) {
	const dog = await findDogDocuByDogId(request.params.dogId)
	if (!dog)
		throw new AppError(404, 'NOT_FOUND', 'Dog not found')
	if (!dog.dog_formular_path)
		throw new AppError(404, 'NOT_FOUND', 'Dog form not found')
	await deleteDogDocu(request.params.dogId)
	await fs.unlink(dog.dog_formular_path)
	return reply.code(204).send()
}

export { getDogDocu, putDogDocu, removeDogDocu }