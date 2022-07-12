/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 11:34:17
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 11:36:28
 */
import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

export default { getAll }
