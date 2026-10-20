const configRateLimit5 = {
	rateLimit: {
		max: 5,
		timeWindow: '1 minute'
	}
}
const configRateLimit3 = {
	rateLimit: {
		max: 3,
		timeWindow: '1 minute'
	}
}

const configRateLimit10 = {
	rateLimit: {
		max: 10,
		timeWindow: '1 minute'
	}
}

const loginSchema = {
    body: {
      type: 'object',
      properties: {
        email: { 
          type: 'string',
          format: 'email',
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
      date_of_birth: { 
        type: 'string',
        format: 'date'
      },
      longitude: { type: 'number', minimum: -180,  maximum: 180},
      latitude: { type: 'number', minimum: -90,  maximum: 90 },
      radius: { type: 'integer', minimum: 1, maximum: 500} // jsuis passé de number a integer pour evier les decimaux, on garde?
    },
    required: ['first_name', 'last_name', 'email', 'password', 'city', 'date_of_birth', 'longitude', 'latitude'],
    additionalProperties: false
  }
}

export {loginSchema, registerSchema, configRateLimit10, configRateLimit5, configRateLimit3}