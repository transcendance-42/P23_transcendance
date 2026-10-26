const dogIdParamsDocu = {
	type: 'object',
	properties: {
		dogId: {
			type: 'string',
			pattern: '^[1-9][0-9]*$',
			maxLength: 18
		}
	},
	required: ['dogId']
}

const getDocuDogSchema = {
	params : dogIdParamsDocu
}

const putDocuDogSchema = {
	params: dogIdParamsDocu,
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
  	params: dogIdParamsDocu
}

export { getDocuDogSchema, putDocuDogSchema, deleteDocuDogSchema }