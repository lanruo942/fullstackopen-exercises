/*
 * @Author: Summer Lee
 * @Date: 2022-07-06 00:22:22
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-06 00:25:56
 */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

export default {
	getAll
}