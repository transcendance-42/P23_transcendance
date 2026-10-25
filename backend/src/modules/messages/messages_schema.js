const getMessagesSchema = {
  params: {
    type: 'object',
    properties: { matchId: { type: 'string', pattern: '^[1-9][0-9]*$', maxLength: 19} },
    required: ['matchId']
  }
}

const createMessageSchema = {
  body: {
    type: 'object',
    properties: {
      match_id: { type: 'string', pattern: '^[1-9][0-9]*$', maxLength: 19 },
      sender_id: { type: 'string', pattern: '^[1-9][0-9]*$', maxLength: 19 },
      content: { type: 'string' }
    },
    required: ['match_id', 'sender_id', 'content'],
    additionalProperties: false
  }
}

const deleteMessageSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'string', pattern: '^[1-9][0-9]*$', maxLength: 19 } },
    required: ['id']
  }
}

export { getMessagesSchema, createMessageSchema, deleteMessageSchema }