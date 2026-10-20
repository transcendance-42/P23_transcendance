const getUserByIdSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'integer' } },
    required: ['id']
  }
}

const updateUserSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    },
    required: ['id']
  },

  body: {
    type: 'object',
    properties: {
      first_name: { type: 'string', minLength: 3,  maxLength: 20},
      last_name: { type: 'string', minLength: 3,  maxLength: 20 },
      city: { type: 'string', minLength: 3 },
      date_of_birth: { type: 'string', format: 'date'}
    },
    additionalProperties: false
  }
}

const updateUserPositionSchema = {
    params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    },
    required: ['id']
  },
    body: {
    type: 'object',
    properties: {
      city: { type: 'string', minLength: 3 },
      longitude: { type: 'number', minimum: -180,  maximum: 180},
      latitude: { type: 'number', minimum: -90,  maximum: 90 },
      radius: { type: 'integer', minimum: 1, maximum: 500} // pareil que dans register integer poru eviter les decimaux
    },
    additionalProperties: false
  }
}

const deactivateUserSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'integer' } },
    required: ['id']
  }
}

export { getUserByIdSchema, updateUserSchema, deactivateUserSchema, updateUserPositionSchema }