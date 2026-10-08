const getMatchesByUserSchema = {
  params: {
    type: 'object',
    properties: { userId: { type: 'integer' } },
    required: ['userId']
  }
}

// const getMyMatchesSchema = {
//   params: {
//     type: 'object'
//   }
// }

const getMatchMessagesSchema = {
  params: {
    type: 'object',
    properties: { match_id: { type: 'integer' } },
    required: ['match_id']
  }
}

const deleteMatchSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'integer' } },
    required: ['id']
  }
}

export { getMatchesByUserSchema, getMatchMessagesSchema, deleteMatchSchema }