/*
 * @Author: Summer Lee
 * @Date: 2022-03-12 19:50:27
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-12 20:59:54
 */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

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

const delPerson = id => (
	axios
		.delete(`${baseUrl}/${id}`)
)

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, delPerson }