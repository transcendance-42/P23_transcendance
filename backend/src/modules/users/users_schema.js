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

const getUserByIdSchema = {
  params: idParams
}

const updateUserSchema = {
  params: idParams,
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
    params: idParams,
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
  params: idParams
}

export { getUserByIdSchema, updateUserSchema, deactivateUserSchema, updateUserPositionSchema }