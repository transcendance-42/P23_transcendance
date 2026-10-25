import http from 'node:http'

const startedAt = Date.now()
const elapsed = () => `${Date.now() - startedAt} ms`

const request = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/test-slow-upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': 1_000_000, // on annonce 1 Mo...
    Connection: 'close',
  },
}, (response) => {
  console.log(`Réponse après ${elapsed()} : HTTP ${response.statusCode}`) // attendu : 408
  response.on('data', (chunk) => process.stdout.write(chunk))
  response.on('end', () => console.log('\nRéponse terminée'))
})

request.on('error', (error) => {
  console.error(`Erreur après ${elapsed()} :`, error.code, error.message)
})

request.on('close', () => {
  console.log(`Connexion fermée après ${elapsed()}`)
  // clearInterval(timer)
})

// ...mais on n'en envoie que quelques octets, lentement, et on ne fait jamais end()
request.write('{"test":true')
// const timer = setInterval(() => {
//   request.write(' ')
//   console.log(`Octet envoyé à ${elapsed()}`)
// }, 1_000)