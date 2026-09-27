const createSwipeSchema = {
    body: {
        type: 'object',
        properties: {
            target_id: { type: 'integer' },
            direction: {
                type: 'string',
                enum: ['left', 'right']
            }
        },
        required: ['target_id', 'direction'],
        additionalProperties: false
    }
}

export { createSwipeSchema }