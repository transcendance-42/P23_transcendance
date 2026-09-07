const createSwipeSchema = {
            body: {
                type: 'object',
                properties: {
                    swiper_id: { type: 'integer' },
                    target_id: { type: 'integer' },
                    direction: { type: 'string', enum: ['left', 'right'] }
                },
                required: ['swiper_id', 'target_id', 'direction']
            }
    }

module.export = createSwipeSchema