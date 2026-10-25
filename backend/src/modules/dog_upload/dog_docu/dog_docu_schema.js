import { dogIdParams } from '../../dog/dogs_schema.js'

const getDocuDogSchema = {
	params : dogIdParams
}

const putDocuDogSchema = {
	params: dogIdParams,
	consumes: ['multipart/form-data'],
	body: {
		type: 'object',
		properties: {
			file: { type: 'object' },
		},
		required: ['file'],
		additionalProperties: false
	}
}

const deleteDocuDogSchema = {
  	params: dogIdParams
}

export { getDocuDogSchema, putDocuDogSchema, deleteDocuDogSchema }