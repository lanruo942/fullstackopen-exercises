/*
 * @Author: Summer Lee
 * @Date: 2022-03-14 15:58:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-19 16:37:08
 */
require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(express.json())


app.get('/api/info', (request, response, next) => {
	Person.estimatedDocumentCount({})
		.then(count => {
			const body = `<div><p>Phonebook has info for ${count} people</p><p>${new Date()}</p></div>`
			response.send(body)
		})
		.catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then(persons => {
			response.json(persons)
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(result => {
			result === null ? response.status(404).end() : response.json(result)
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'name or number missing'
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	
	const person = {
		name: body.name,
		number: body.number,
	}
	Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			console.log(result)
			result === null ? response.status(404).end() : response.status(204).end()
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.log(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})