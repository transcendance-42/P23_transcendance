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
      date_of_birth: { type: 'string', minLength: 3}
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
      radius: { type: 'number', minimum: 1}
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

const deleteUserSchema = {
  params: {
    type: 'object',
    properties: {id: {type: 'integer'}},
    required: ['id'],
    additionalProperties: false
  },
}

export { getUserByIdSchema, updateUserSchema, deactivateUserSchema, updateUserPositionSchema, deleteUserSchema }