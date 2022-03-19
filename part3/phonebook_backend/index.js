/*
 * @Author: Summer Lee
 * @Date: 2022-03-14 15:58:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-19 10:53:42
 */
require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

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

app.get('/api/info', (request, response) => {
	const amount = persons.reduce((count, person) => {
		if (typeof person === 'object') {
			return ++count
		}
	}, 0)

	const body = `<div><p>Phonebook has info for ${amount} people</p><p>${new Date()}</p></div>`
	response.send(body)
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(req.params.id)
	const person = persons.find(p => p.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'name or number missing'
		})
	}

	// if (isExist) {
	// 	return res.status(403).json({
	// 		error: 'name must be unique'
	// 	})
	// }

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then(savedPerson => {
			response.json(person)
		})
		.catch(error => {
			console.log('new data does note added: ', error.message)
		})
})

app.put('/api/persons/:id', (request, response) => {
	const body = request.body
	
	persons = persons.map(p => p.id === body.id ? body : p)
	
	response.json(body)
})

app.delete('/api/persons/:id', (request, response) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			result === null ? response.status(404).end() : response.status(204).end()
		})
		.catch(error => {
			console.log(error.message)
			response.status(400).send({ error: 'malformatted id' })
		})
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})