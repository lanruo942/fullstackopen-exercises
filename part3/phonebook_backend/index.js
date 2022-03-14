/*
 * @Author: Summer Lee
 * @Date: 2022-03-14 15:58:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-14 16:55:30
 */
const express = require('express')
const { type } = require('os')

const app = express()

const persons = [
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
	res.json(persons)
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

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})