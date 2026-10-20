const idParams = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      pattern: '^[1-9][0-9]*$',
      maxLength: 19
    }
  }
}

const rateLimitPhoto = {
  	rateLimit: {
		max: 10,
		timeWindow: '1 minute'
	}
}

const getDogPicSchema = {
  params: idParams
}

const getDogPicsSchema = {
  params: idParams
}

const createDogPicSchema = {
  consumes: ['multipart/form-data'],
  body: {
    type: 'object',
    properties: {
      file: { type: 'object' },
      dog_id: { type: 'object' },
      position: { type: 'object' }
    },
    required: ['file', 'dog_id', 'position']
  }
}

const updateDogPicSchema = {
  params: idParams,
  consumes: ['multipart/form-data'],
  body: {
    type: 'object',
    properties: {
      file: { type: 'object' },
      position: { type: 'object' }
    },
    required: ['file', 'position'],
    additionalProperties: false
  }
}

const deleteDogPicSchema = {
  params: idParams
}

export { getDogPicSchema, getDogPicsSchema, createDogPicSchema, updateDogPicSchema, deleteDogPicSchema, rateLimitPhoto }