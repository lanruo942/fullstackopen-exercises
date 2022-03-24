/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:13:58
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-24 15:26:50
 */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog.save()
		.then(savedBlog => {
			response.status(201).json(savedBlog)
		})
})

module.exports = blogsRouter