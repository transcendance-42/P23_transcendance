const getDocuDogSchema = {
	params: {
    	type: 'object',
    	properties: {
      		dogId: { type: 'string' }
   		},
    	required: ['dogId']
  }
}

const putDocuDogSchema = {
	consumes: ['multipart/form-data'],
	body: {
		type: 'object',
		properties: {
			file: { type: 'object' },
		},
		required: ['file']
	}
}

const deleteDocuDogSchema = {
  	params: {
		type: 'object',
		properties: {
			dogId: { type: 'string' }
		},
		required: ['dogId']
	}
}

export { getDocuDogSchema, putDocuDogSchema, deleteDocuDogSchema }