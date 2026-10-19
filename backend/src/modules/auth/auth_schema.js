const loginSchema = {
    body: {
      type: 'object',
      properties: {
        email: { 
          type: 'string',
          format: 'email', // rajouter module ajv-format pour que ca marche 
          maxLength: 200
         },
        password: {
          type: 'string',
          minLength:8,
          maxLength:40
         }
      },
      required: ['email', 'password'],
      additionalProperties: false
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
      latitude: {type: 'number'},
      longitude: {type: 'number'},
      radius: {
        type: 'integer',
        minimum: 1},
      date_of_birth: { type: 'string'},
      longitude: { type: 'number', minimum: -180,  maximum: 180},
      latitude: { type: 'number', minimum: -90,  maximum: 90 },
      radius: { type: 'number', minimum: 1}
    },
    required: ['first_name', 'last_name', 'email', 'password', 'city', 'date_of_birth', 'longitude', 'latitude'],
    additionalProperties: false
  }
}

export {loginSchema, registerSchema}