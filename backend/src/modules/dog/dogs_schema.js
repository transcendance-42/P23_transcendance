const dogIdParams = {
	type: 'object',
	properties: {
		dogId: {
			type: 'string',
			pattern: '^[1-9][0-9]*$',
			maxLength: 18
		}
	},
	required: ['dogId']
}

const SchemaDogGetId = {
	params: dogIdParams
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
	params: dogIdParams, 
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
	params: dogIdParams
}

export {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete, dogIdParams}