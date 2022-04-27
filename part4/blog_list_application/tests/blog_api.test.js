/*
 * @Author: Summer Lee
 * @Date: 2022-04-26 23:50:17
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-04-27 17:19:08
 */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
	mongoose.connection.close()
})