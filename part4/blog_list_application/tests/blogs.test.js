/*
 * @Author: Summer Lee
 * @Date: 2022-04-11 15:26:25
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-04-11 16:23:05
 */
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})