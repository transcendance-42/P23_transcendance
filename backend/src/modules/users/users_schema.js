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
    properties: { id: { type: 'integer' } },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' }
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

module.exports = { getUserByIdSchema, updateUserSchema, deactivateUserSchema }