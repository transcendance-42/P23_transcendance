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
      file_path: { type: 'string' },
      position: { type: 'integer' }
    },
    required: ['dog_id', 'file_path', 'position']
  }
}

const deleteDogPicSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'integer' } },
    required: ['id']
  }
}

module.exports = { getDogPicsSchema, createDogPicSchema, deleteDogPicSchema }