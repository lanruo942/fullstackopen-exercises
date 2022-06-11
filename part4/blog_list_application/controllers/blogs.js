/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:13:58
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-12 02:33:19
 */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
	response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body
	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save({
		validateModifiedOnly: true
	})

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const user = request.user
	const blog = await Blog.findById(request.params.id)

	if (!blog) {
		return response.status(404).json({ error: 'id invalid' })
	}

	if (blog.user.toString() !== user.id.toString()) {
		return response.status(403).end()
	}

	await blog.remove()
	response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
	const blog = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog)
})

module.exports = blogsRouter