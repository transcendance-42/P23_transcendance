const configRateLimit = {
	rateLimit: {
	max: 10,
	timeWindow: '1 minute'
	}
}

const configRateLimitAdmin = {
	rateLimit: {
	max: (request) => request.role === 'admin' ? Infinity : 100,
	timeWindow: '1 minute'
	}
}

const idParams = {
  type: 'object',
  properties: { 
    id: { 
      type: 'string',
      pattern: '^[1-9][0-9]*$',
      maxLength: 19
    } 
  },
  required: ['id']
}

const getUserPicSchema = {
    params: idParams
}

const putUserPicSchema = {
	params: idParams,
	consumes: ['multipart/form-data'],
	body: {
		type: 'object',
		properties: { file: { type: 'object' } },
		required: ['file'],
		additionalProperties: false
	}
}

const deleteUserPicSchema = {
	params: idParams
}

export { getUserPicSchema, putUserPicSchema, deleteUserPicSchema, configRateLimit, configRateLimitAdmin }