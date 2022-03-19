/*
 * @Author: Summer Lee
 * @Date: 2022-03-14 15:58:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-19 11:42:44
 */
require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()

let persons = [
	{ 
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

const personFind = (v, id) => Object.prototype.toString.call(v.id) === '[object String]'
	? v.id === id
	: String(v.id) === id

const personFilter = (v, id) => Object.prototype.toString.call(v.id) === '[object String]'
	? v.id !== id
	: String(v.id) !== id

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

app.put('/api/persons/:id', (request, response) => {
	const body = request.body
	
	persons = persons.map(p => p.id === body.id ? body : p)
	
	response.json(body)
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
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})