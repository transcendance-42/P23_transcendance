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
		owner_id: { type: 'integer' },
		dog_name: { type: 'string' },
		bio: { type: 'string' },
		gender: { type: 'string' },
		size: { type: 'string' }
	},
	required: ['owner_id', 'dog_name', 'gender', 'size']
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