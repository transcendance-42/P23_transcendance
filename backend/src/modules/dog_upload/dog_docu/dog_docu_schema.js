const getFormularDogSchema = {
	params: {
    	type: 'object',
    	properties: {
      		dogId: { type: 'string' }
   		},
    	required: ['dogId']
  }
}

const putFormularDogSchema = {
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

const deleteFormularDogSchema = {
  	params: {
		type: 'object',
		properties: {
			dogId: { type: 'string' }
		},
		required: ['dogId']
	}
}

export { getFormularDogSchema, putFormularDogSchema, deleteFormularDogSchema }