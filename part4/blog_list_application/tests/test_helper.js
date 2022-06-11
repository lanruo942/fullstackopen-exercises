/*
 * @Author: Summer Lee
 * @Date: 2022-04-27 00:56:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-11 23:13:28
 */
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
]

const initialUsers = [
	{
		username: 'root',
		name: 'root',
		passwordHash: '$2b$10$SXRdW4ydELdeEC2Sb8IOzO9KngdaMioKvE9q0TqIdCw6wJsJTnJEO'
	},
	{
		username: 'mluukkai',
		name: 'Matti Luukkainen',
		passwordHash: '$2b$10$focrT/nWQiTESHBp8cXZVOfBBJWNJr0b1V09vTqFLYGdN4Z60QoG.'
	}
]

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'test',
		author: 'test',
		url: 'test'
	})

	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})

	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})

	return users.map(user => user.toJSON())
}

module.exports = {
	initialBlogs,
	initialUsers,
	nonExistingId,
	blogsInDb,
	usersInDb
}