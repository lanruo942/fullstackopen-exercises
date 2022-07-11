/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 15:47:33
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-17 15:49:34
 */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

export default { login }
