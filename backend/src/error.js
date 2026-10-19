class AppError extends Error {
	constructor(statusCode, code, message) {
		super(message)
		this.statusCode = statusCode
		this.code = code
		this.isOperational = true
		this.message = message
	}
}

export function errorHandler(error, request, reply) {

	if (error.validation) {
		return reply.code(400).send({
			error: 'VALIIDATION_ERROR',
			message: 'Invalid request data'
		})
	}

	if (error.code === 'P2002') {
		return reply.code(409).send({
		error: 'RESOURCE_ALREADY_EXISTS',
		message: 'A resource with these values already exists'
		})
	}

	if (error.code === 'P2025') {
		return reply.code(404).send({
		error: 'RESOURCE_NOT_FOUND',
		message: 'The requested resource was not found'
		})
	}

	if (error.code === 'P2003') {
		return reply.code(409).send({
		error: 'FOREIGN_KEY_VIOLATION',
		message: 'Reference Invalid'
		})
	}

	if (error.code === 'P2000') {
		return reply.code(400).send({
		error: 'VALUE_TOO_LONG',
		message: 'Value too long'
		})
	}

	if (error.code === 'P2024') {
		return reply.code(404).send({
		error: 'DB_BUSY',
		message: 'Service temporary unavaible'
		})
	}
	
	if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
		return reply.code(error.statusCode).send({
		error: error.code || 'REQUEST_ERROR',
		message: error.message || 'Request failed'
	})
	}

  // Toutes les erreurs imprévues
	return reply.code(500).send({
		error: 'INTERNAL_SERVER_ERROR',
		message: 'Internal server error'
	})

} 



export { AppError }