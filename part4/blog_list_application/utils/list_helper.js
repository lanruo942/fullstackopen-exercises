/*
 * @Author: Summer Lee
 * @Date: 2022-04-10 21:26:24
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-04-12 16:09:31
 */
const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((prev, next) => {
		return prev + next.likes
	}, 0)
}

module.exports = {
	dummy,
	totalLikes
}