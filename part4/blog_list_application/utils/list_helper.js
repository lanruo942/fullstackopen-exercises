/*
 * @Author: Summer Lee
 * @Date: 2022-04-10 21:26:24
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-04-12 16:42:06
 */
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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}