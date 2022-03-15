/*
 * @Author: Summer Lee
 * @Date: 2022-03-12 19:50:27
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-15 21:16:19
 */
import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => (
	axios
		.get(baseUrl)
		.then(response => response.data)
)

const create = newObject => (
	axios
		.post(baseUrl, newObject)
		.then(response => response.data)
)

const update = (id, person) => (
	axios
		.put(`${baseUrl}/${id}`, person)
		.then(response => response.data)
)

const delPerson = id => (
	axios
		.delete(`${baseUrl}/${id}`)
)

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, delPerson }