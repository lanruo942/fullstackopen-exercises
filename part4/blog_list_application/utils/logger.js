/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:06:39
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-24 15:10:56
 */
const info = (...params) => {
	console.log(...params)
}

const error = (...params) => {
	console.error(...params)
}

module.exports = {
	info,
	error
}