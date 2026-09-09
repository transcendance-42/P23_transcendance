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
      email: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      city: { type: 'string' }
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

export { getUserByIdSchema, updateUserSchema, deactivateUserSchema }