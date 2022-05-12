/*
 * @Author: Summer Lee
 * @Date: 2022-05-10 12:12:44
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-05-13 02:25:05
 */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})

	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const body = request.body

	if (!body.password || body.password.length <= 3) {
		return response.status(400).send({ error: 'malformatted password' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

module.exports = usersRouter