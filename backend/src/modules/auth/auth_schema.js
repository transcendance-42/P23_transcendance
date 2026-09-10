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
        minLenght: 3,
        maxLenght: 20
      },
      last_name: {
        type: 'string',
        minLenght: 3,
        maxLenght: 20
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
        minLenght: 8,
        maxLenght: 20
      }
    },
    required: ['first_name', 'last_name', 'age', 'email', 'password']
  }
}

export {loginSchema, registerSchema}