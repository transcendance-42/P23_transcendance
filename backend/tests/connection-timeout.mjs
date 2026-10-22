import http from 'node:http'

const firstPart = '{"test":'
const secondPart = 'true}'
const bodyLength = Buffer.byteLength(firstPart + secondPart)
const startedAt = Date.now()

let sendRemainingBody

const request = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/test-slow-upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': bodyLength,
    Connection: 'close',
  },
}, (response) => {
  clearTimeout(sendRemainingBody)

  console.log(
    `Réponse après ${Date.now() - startedAt} ms : HTTP ${response.statusCode}`,
  )

  response.on('data', (chunk) => process.stdout.write(chunk))
  response.on('end', () => console.log('\nRéponse terminée'))
})

request.on('error', (error) => {
  clearTimeout(sendRemainingBody)

  console.error(
    `Erreur après ${Date.now() - startedAt} ms :`,
    error.code,
    error.message,
  )
})

request.write(firstPart)

sendRemainingBody = setTimeout(() => {
  request.write(secondPart)
  request.end()
}, 35_000)
