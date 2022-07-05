/*
 * @Author: Summer Lee
 * @Date: 2022-07-06 00:22:22
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-06 02:04:19
 */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (content) => {
	const object = { content, votes: 0 }
	const response = await axios.post(baseUrl, object)
	return response.data
}

const update = async (id, updateValue) => {
	const response = await axios.patch(`${baseUrl}/${id}`, updateValue)
	return response.data
}

export default {
	getAll,
	create,
	update
}