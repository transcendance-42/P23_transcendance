const matchIdParams = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            pattern: '^[1-9][0-9]*$',
            maxLength: 18
        }
    },
    required: ['id']
}

const getMatchesByUserSchema = {
  params: matchIdParams
}

const getMatchMessagesSchema = {
  params: matchIdParams
}

const deleteMatchSchema = {
  params: matchIdParams
}

export { getMatchesByUserSchema, getMatchMessagesSchema, deleteMatchSchema }