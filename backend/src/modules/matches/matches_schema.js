const getMatchesByUserSchema = {
  params: {
    type: 'object',
    properties: { userId: { type: 'integer' } },
    required: ['userId']
  }
}

const deleteMatchSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'integer' } },
    required: ['id']
  }
}

module.exports = { getMatchesByUserSchema, deleteMatchSchema }