const fastify = require('fastify')({ logger: true })
const { hashPassword } = require('./utils/password')

fastify.get('/health', async () => {
  return { status: 'config minimal ok prêt pour developper backend' }
})

fastify.listen({ port: 3000, host: '0.0.0.0' })

fastify.post('/register',{
  schema: {
    body: {
      type: 'object',
      required: ['email','password', 'first_name', 'last_name', 'city', 'date_of_birth'],
      properties: {
        email: { type: 'string', format: 'email'},
        password: { type: 'string', minLength: 8 },
        first_name: {type : 'string'},
        last_name: {type: 'string'},
        city: {type: 'string'},
        date_of_birth: {type: 'string', format: 'date'}
      }
    }
  }
}, async(request,reply) => {
  const {email, password} = request.body;
  // TODO: Prisma vérifier si l'email existe déjà, sinon 409
  const hashPass = await hashPassword(password);
  console.log('mot de passe hashé : ',hashPass);
  // TODO: Prisma insérer le user en DB
  reply.code(501).send({ message: 'teste avant implémentation '})

})