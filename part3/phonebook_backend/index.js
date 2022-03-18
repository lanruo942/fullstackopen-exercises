/*
 * @Author: Summer Lee
 * @Date: 2022-03-14 15:58:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-18 16:10:05
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

app.get('/api/info', (req, res) => {
	const amount = persons.reduce((count, person) => {
		if (typeof person === 'object') {
			return ++count
		}
	}, 0)

	const body = `<div><p>Phonebook has info for ${amount} people</p><p>${new Date()}</p></div>`
	res.send(body)
})

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(p => p.id === id)

	if (person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

app.post('/api/persons', (req, res) => {
	const body = req.body

	if (!body.name || !body.number) {
		return res.status(400).json({
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
			res.json(person)
		})
		.catch(error => {
			console.log('new data does note added: ', error.message)
		})
})

app.put('/api/persons/:id', (req, res) => {
	const body = req.body
	
	persons = persons.map(p => p.id === body.id ? body : p)
	
	res.json(body)
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id
	const person = persons.find(p => personFind(p, id))

	if (person) {
		persons = persons.filter(p => personFilter(p, id))

		res.status(204).end()
	} else {
		res.status(404).end()
	}
	
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})