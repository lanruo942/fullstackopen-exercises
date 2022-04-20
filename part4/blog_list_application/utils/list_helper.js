/*
 * @Author: Summer Lee
 * @Date: 2022-04-10 21:26:24
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-04-20 17:48:19
 */
const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((prev, next) => {
		return prev + next.likes
	}, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length !== 0) {
		const blog = blogs.reduce((prev, next) => {
			return prev.likes < next.likes ? next : prev
		})

		return {
			title: blog.title,
			author: blog.author,
			likes: blog.likes
		}
	} else {
		return 'blog list is empty.'
	}
}

const mostBlogs = (blogs) => {
	// lodash
	if (blogs.length !== 0) {
		const authors = _.countBy(blogs, 'author')
		const author = _.reduce(authors, (result, value, key) => {
			return result.blogs > value ? result : { author: key, blogs: value }
		}, { author: 'Anonymous', blogs: 0 })

		return author
	} else {
		return 'blog list is empty.'
	}

	// js
	// if (blogs.length !== 0) {
	// 	let authors = blogs.map((blog) => blog.author)

	// 	const distinct = (arr) => {
	// 		let result = []
	// 		let obj = {}

	// 		for (let i of arr) {
	// 			if (!obj[i]) {
	// 				obj[i] = 1
	// 				result.push({
	// 					author: i,
	// 					blogs: 1
	// 				})
	// 			} else {
	// 				let index = result.findIndex((item) => item['author'] === i)
	// 				result[index]['blogs'] += 1
	// 			}
	// 		}

	// 		return result
	// 	}

	// 	authors = distinct(authors)

	// 	return authors.reduce((prev, next) => prev.blogs < next.blogs ? next : prev)
	// } else {
	// 	return 'blog list is empty.'
	// }
}

const mostLikes = (blogs) => {
	if (blogs.length !== 0) {
		const authors = _.reduce(blogs, (result, value, key) => {
			if (result[value.author]) {
				result[value.author] += value.likes
			} else {
				result[value.author] = value.likes
			}

			return result
		}, {})

		const author = _.reduce(authors, (result, value, key) => {
			return result.likes > value ? result : { author: key, likes: value }
		}, { author: 'Anonymous', likes: 0 })

		return author
	} else {
		return 'blog list is empty.'
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}