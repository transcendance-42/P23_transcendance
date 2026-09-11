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
      required: ['email', 'password']
    }
}

export {loginSchema}