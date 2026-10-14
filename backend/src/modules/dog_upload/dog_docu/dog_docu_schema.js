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
			dog_id: { type: 'object' }
		},
		required: ['file', 'dog_id']
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