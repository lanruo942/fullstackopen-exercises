/*
 * @Author: Summer Lee
 * @Date: 2022-07-01 02:56:42
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-01 02:58:43
 */
const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	response.status(204).end()
})

module.exports = testingRouter