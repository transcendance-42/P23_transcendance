const loginSchema = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['email', 'password']
  }
}

const registerSchema = {
  body: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
        minLength: 3,
        maxLength: 20
      },
      last_name: {
        type: 'string',
        minLength: 3,
        maxLength: 20
      },
      age: {
        type: 'integer',
        minimum: 18
      },
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 20
      }
    },
    required: ['first_name', 'last_name', 'email', 'password']
  }
}

export {loginSchema, registerSchema}