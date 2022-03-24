/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:13:58
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-24 18:29:12
 */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
	Blog.find({})
		.then(blogs => {
			response.json(blogs)
		})
		.catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
	const blog = new Blog(request.body)

	blog.save()
		.then(savedBlog => {
			response.status(201).json(savedBlog)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter