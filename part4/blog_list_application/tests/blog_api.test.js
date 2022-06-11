/*
 * @Author: Summer Lee
 * @Date: 2022-04-26 23:50:17
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-12 01:11:07
 */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})

	const user = await User.findOne({ username: 'mluukkai' })

	const blogsAddUserid = helper.initialBlogs.map(blog => {
		blog.user = user._id
		return blog
	})
	await Blog.insertMany(blogsAddUserid)
})

describe('when there is initially some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('id is the unique identifier', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].id).toBeDefined()
	})
})

describe('addition of a new blog', () => {
	test('succeeds with valid data', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
		}

		const userInfo = {
			username: 'mluukkai',
			password: 'salainen'
		}

		const response = await api
			.post('/api/login')
			.send(userInfo)
			.expect(200)

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${response.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).toContain('Canonical string reduction')
	})

	test('if likes unset, default value is zero', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		}

		const userInfo = {
			username: 'mluukkai',
			password: 'salainen'
		}

		const response = await api
			.post('/api/login')
			.send(userInfo)
			.expect(200)

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${response.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd[helper.initialBlogs.length]['likes']).toBe(0)
	})

	test('blog without title or url is not added', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 7
		}

		const userInfo = {
			username: 'mluukkai',
			password: 'salainen'
		}

		const response = await api
			.post('/api/login')
			.send(userInfo)
			.expect(200)

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${response.body.token}`)
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})
	test('token no exist is not added', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 7
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		const userInfo = {
			username: 'mluukkai',
			password: 'salainen'
		}

		const response = await api
			.post('/api/login')
			.send(userInfo)
			.expect(200)

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `bearer ${response.body.token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe('update of a blog', () => {
	test('succeeds with valid data', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const blog = {
			likes: 101,
		}

		const response = await api
			.patch(`/api/blogs/${blogToUpdate.id}`)
			.send(blog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		const blogFirst = { ...blogsAtEnd[0], user: blogsAtEnd[0].user.toJSON() }

		expect(response.body).toEqual(blogFirst)
	})
})

afterAll(() => {
	mongoose.connection.close()
})