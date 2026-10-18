const getMatchesByUserSchema = {
  params: {
    type: 'object',
    properties: { userId: { type: 'integer' } },
    required: ['userId']
  }
}

const getMatchMessagesSchema = {
  params: {
    type: 'object',
    properties: { matchId: { type: 'integer' } },
    required: ['matchId']
  }
}

const deleteMatchSchema = {
  params: {
    type: 'object',
    properties: { matchId: { type: 'integer' } },
    required: ['matchId']
  }
}

export { getMatchesByUserSchema, getMatchMessagesSchema, deleteMatchSchema }