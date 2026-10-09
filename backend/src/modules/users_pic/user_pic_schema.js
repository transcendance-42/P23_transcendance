const postUserPicSchema = {
	consumes: ['multipart/form-data'],
	body: {
		type: 'object',
		properties: { file: { type: 'object' } },
		required: ['file']
	}
}

export { postUserPicSchema }