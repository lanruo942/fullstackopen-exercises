/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 14:56:52
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-25 15:37:35
 */
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch(error => {
		logger.error('error connecting to MongoDB: ', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app