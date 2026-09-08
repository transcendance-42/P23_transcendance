const getMessagesSchema = {
  params: {
    type: 'object',
    properties: { matchId: { type: 'integer' } },
    required: ['matchId']
  }
}

const createMessageSchema = {
  body: {
    type: 'object',
    properties: {
      match_id: { type: 'integer' },
      sender_id: { type: 'integer' },
      content: { type: 'string' }
    },
    required: ['match_id', 'sender_id', 'content']
  }
}

const deleteMessageSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'integer' } },
    required: ['id']
  }
}

export { getMessagesSchema, createMessageSchema, deleteMessageSchema }