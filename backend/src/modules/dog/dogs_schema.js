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
		dog_name: { type: 'string', minLength: 2 },
		bio: { type: 'string', maxLength: 400 },
		breed: { type: 'string', maxLength: 30},
		age: { type: 'integer'},
		gender: { type: 'string', enum:['Male', 'Female', 'Other'] },
		size: { type: 'string', enum:['Small', 'Medium', 'Large'] }
	},
	required: ['dog_name', 'gender', 'size'],
	additionalProperties: false
	}
}

const SchemaDogsPut = {
	params: {
	type: 'object',
	minProperties:1,
	properties: { id: { type: 'integer' } },
	required: ['id']
	}, 
	body: {
	type: 'object',
	properties: {
		dog_name: { type: 'string', minLength: 2 },
		bio: { type: 'string', maxLength: 400 },
		breed: { type: 'string', maxLength: 30},
		age: { type: 'integer'},
		gender: { type: 'string', enum:['Male', 'Female', 'Other'] },
		size: { type: 'string', enum:['Small', 'Medium', 'Large'] }
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