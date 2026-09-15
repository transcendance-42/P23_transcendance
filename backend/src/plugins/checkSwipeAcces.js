
async function checkSwipeAcces(request, reply) {
     // const userId = request.userId // pour l'instant undefined besoin de l'auth de token
    const userId = 1;
    const swiperId = request.body.swiper_id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== swiperId.toString())
        return reply.code(403).send({error: 'Forbidden'})      
}

export { checkSwipeAcces }