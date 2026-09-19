const SchemaDogGetId = {
	params: {
	type: 'object',
	properties: { id: { type: 'integer' } },
	required: ['id'] 
	}
}

const SchemaDogPost = {
	body: {
	type: 'object',
	properties: {
		dog_name: { type: 'string' },
		bio: { type: 'string' },
		gender: { type: 'string' },
		size: { type: 'string' }
	},
	required: ['dog_name', 'gender', 'size']
	}
}

const SchemaDogsPut = {
	params: {
	type: 'object',
	properties: { id: { type: 'integer' } },
	required: ['id']
	}, 
	body: {
	type: 'object',
	properties: {
		dog_name: { type: 'string' },
		bio: { type: 'string' },
		breed: { type: 'string' },
		age: { type: 'integer' },
		gender: { type: 'string' },
		size: { type: 'string' }
	},
	additionalProperties: false
	}
}

const SchemaDogsDelete = {
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id']
      }
    }

export {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete}