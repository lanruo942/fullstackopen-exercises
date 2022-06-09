/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 18:13:30
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-09 23:17:02
 */
const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7)
	}

	next()
}

const requestLogger = (request, response, next) => {
	logger.info('Method: ', request.method)
	logger.info('Path:   ', request.path)
	logger.info('Body:   ', request.body)
	logger.info('---')

	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'invalid token' })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token expired' })
	}

	logger.error(error.message)

	next(error)
}

module.exports = {
	tokenExtractor,
	requestLogger,
	unknownEndpoint,
	errorHandler
}