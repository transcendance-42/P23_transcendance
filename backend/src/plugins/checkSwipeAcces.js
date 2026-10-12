
async function checkSwipeAcces(request, reply) {
    const userId = request.userId
    const swiperId = request.body.swiper_id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== swiperId.toString())
        return reply.code(403).send({error: 'Forbidden'})      
}

export { checkSwipeAcces }