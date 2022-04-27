/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:06:39
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-04-27 16:59:45
 */
const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	}
}

const error = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(...params)
	}
}

module.exports = {
	info,
	error
}