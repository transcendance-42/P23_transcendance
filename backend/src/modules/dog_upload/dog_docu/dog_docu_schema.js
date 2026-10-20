const dogIdParams = {
    	type: 'object',
    	properties: {
      		dogId: {
				type: 'string',
				pattern: '^[1-9][0-9]*$',
				maxLength: 19
			}
   		},
}

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