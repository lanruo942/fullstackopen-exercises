/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 14:55:04
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-24 15:11:19
 */
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
