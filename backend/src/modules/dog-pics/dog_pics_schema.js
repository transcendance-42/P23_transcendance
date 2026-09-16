const getDogPicsSchema = {
  params: {
    type: 'object',
    properties: { dogId: { type: 'integer' } },
    required: ['dogId']
  }
}

const createDogPicSchema = {
  body: {
    type: 'object',
    properties: {
      dog_id: { type: 'integer' },
      position: { type: 'integer' }
    },
    required: ['dog_id', 'position']
  }
}

const deleteDogPicSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'integer' } },
    required: ['id']
  }
}

export { getDogPicsSchema, createDogPicSchema, deleteDogPicSchema }