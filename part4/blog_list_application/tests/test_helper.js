/*
 * @Author: Summer Lee
 * @Date: 2022-04-27 00:56:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-04-27 16:42:59
 */
const Blog = require('../models/blog')

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

const blogsInDb = async () => {
	const blogs = await Blog.find({})

	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs,
	blogsInDb
}