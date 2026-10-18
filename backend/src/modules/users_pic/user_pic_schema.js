const configRateLimit = {
	rateLimit: {
		max: 10,
		timeWindow: '1 minute'
	}
}

const getUserPicSchema = {
    params: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id']
    }
}

const putUserPicSchema = {
	consumes: ['multipart/form-data'],
	body: {
		type: 'object',
		properties: { file: { type: 'object' } },
		required: ['file']
	}
}

const deleteUserPicSchema = {
	params: {
		type: 'object',
		properties: { id: { type: 'string' } },
		required: ['id']
	}
}

export { getUserPicSchema, putUserPicSchema, deleteUserPicSchema, configRateLimit }