/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:13:24
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-24 15:21:44
 */
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)