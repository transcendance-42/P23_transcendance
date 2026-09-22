const getDogPicsSchema = {
  params: {
    type: 'object',
    properties: { dog_id: { type: 'integer' } },
    required: ['dog_id']
  }
}

const getDogPicSchema = {
  params: {
    type: 'object',
    properties: {
      dog_id: { type: 'integer' },
      pic_id: { type: 'integer' }
   }
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

const deleteDogPicSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'integer' } },
    required: ['id']
  }
}

export { getDogPicsSchema, createDogPicSchema, deleteDogPicSchema, getDogPicSchema }