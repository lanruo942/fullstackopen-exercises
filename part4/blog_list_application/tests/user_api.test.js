/*
 * @Author: Summer Lee
 * @Date: 2022-05-12 19:30:21
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-05-13 02:32:51
 */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})

	await User.insertMany(helper.initialUsers)
})

describe('addition of a new user', () => {
	test('succeeds with valid data', async () => {
		const newUser = {
			username: 'hellas',
			name: 'Arto Hellas',
			password: 'salainen'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

		const names = usersAtEnd.map(u => u.name)
		expect(names).toContain('Arto Hellas')
	})

	test('password length less than 3 will not be added', async () => {
		const newUser = {
			username: 'illegalPassword',
			name: 'illegalPassword',
			password: 'sad'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
	})

	test('username length less than 3 will not be added', async () => {
		const newUser = {
			username: 'ill',
			name: 'illegalUsername',
			password: 'salainen'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
	})

	test('username must be unique', async () => {
		const newUser = {
			username: 'root',
			name: 'root',
			password: 'salainen'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})