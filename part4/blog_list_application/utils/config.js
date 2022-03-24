/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:06:31
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-24 15:07:09
 */
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
	PORT,
	MONGODB_URI
}