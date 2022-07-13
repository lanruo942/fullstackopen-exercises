/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:13:58
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-14 00:37:47
 */
const blogsRouter = require('express').Router()
const { nanoid } = require('nanoid')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
		id: 1,
	})
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
		user: user._id,
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save({
		validateModifiedOnly: true,
	})

	const savedBlogFullUser = await savedBlog.populate('user', {
		username: 1,
		name: 1,
		id: 1,
	})

	response.status(201).json(savedBlogFullUser)
})

blogsRouter.post('/:id/comments', async (request, response) => {
	const body = request.body
	const blog = await Blog.findById(request.params.id)

	if (!blog) {
		return response.status(404).json({ error: 'blog not found' })
	}

	if (!body.comment) {
		return response.status(400).json({ error: 'comment missing' })
	}

	blog.comments = blog.comments.concat({ id: nanoid(), text: body.comment })
	await blog.save()

	response.status(201).json(blog)
})

blogsRouter.delete(
	'/:id',
	middleware.userExtractor,
	async (request, response) => {
		const user = request.user
		const blogInDb = await Blog.findById(request.params.id)
		const userInDb = await User.findById(user.id)

		if (!blogInDb) {
			return response.status(404).json({ error: 'id invalid' })
		}

		if (!blogInDb.user || blogInDb.user.toString() !== user.id.toString()) {
			return response.status(403).end()
		}

		await blogInDb.remove()
		userInDb.blogs = user.blogs.filter(
			(id) => id.toString() !== blogInDb.id.toString()
		)
		await userInDb.save({
			validateModifiedOnly: true,
		})
		response.status(204).end()
	}
)

blogsRouter.patch('/:id', async (request, response) => {
	const blog = request.body
	const blogInDb = await Blog.findById(request.params.id)

	if (!blogInDb) {
		return response.status(404).json({ error: 'id invalid' })
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	}).populate('user', { username: 1, name: 1, id: 1 })
	response.json(updatedBlog)
})

module.exports = blogsRouter
