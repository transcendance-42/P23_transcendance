import https from 'node:https'

const bodyPart1 = '{"a":'
const bodyPart2 = '123}'
const bodyLength = Buffer.byteLength(bodyPart1 + bodyPart2)

const request = https.request(
  {
    hostname: 'localhost',
    port: 443,
    path: '/api/test-slow-upload',
    method: 'POST',
    rejectUnauthorized: false,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': bodyLength,
      'Connection': 'close',
    },
  },
  (response) => {
    console.log(`HTTP ${response.statusCode}`)

    response.on('data', (chunk) => {
      process.stdout.write(chunk)
    })

    response.on('end', () => {
      console.log('\nRéponse terminée')
    })
  },
)

request.on('error', (error) => {
  console.error('Erreur réseau :', error.message)
})

request.write(bodyPart1)

setTimeout(() => {
  request.write(bodyPart2)
  request.end()
}, 10_000)