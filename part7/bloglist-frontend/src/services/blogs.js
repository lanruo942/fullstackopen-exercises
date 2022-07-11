/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-11 18:57:54
 */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = async (id, newObject) => {
	const response = await axios.patch(`${baseUrl}/${id}`, newObject)
	return response.data
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.data
}

export default { setToken, getAll, create, update, remove }
