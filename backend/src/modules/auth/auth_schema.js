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
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 20
      },
      city: {type: 'string'},
      date_of_birth: { type: 'string'},
    },
    required: ['first_name', 'last_name', 'email', 'password', 'city', 'date_of_birth']
  }
}

export {loginSchema, registerSchema}