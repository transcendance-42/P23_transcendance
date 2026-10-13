const getDogPicSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'string' } },
    required: ['id']
  }
}

const getDogPicsSchema = {
  params: {
    type: 'object',
    properties: { dogId: { type: 'string' } },
    required: ['dogId']
  }
}

const createDogPicSchema = {
  consumes: ['multipart/form-data'],
  body: {
    type: 'object',
    properties: {
      file: { type: 'object' },
      dog_id: { type: 'object' },
      position: { type: 'object' }
    },
    required: ['file', 'dog_id', 'position']
  }
}

const updateDogPicSchema = {
  consumes: ['multipart/form-data'],
  body: {
    type: 'object',
    properties: {
      file: { type: 'object' },
      position: { type: 'object' }
    },
    required: ['file', 'position'],
    additionalProperties: false
  }
}

const deleteDogPicSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'string' } },
    required: ['id']
  }
}

export { getDogPicSchema, getDogPicsSchema, createDogPicSchema, updateDogPicSchema, deleteDogPicSchema }