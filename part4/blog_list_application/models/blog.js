/*
 * @Author: Summer Lee
 * @Date: 2022-03-24 15:13:24
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 15:27:17
 */
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: String,
	url: {
		type: String,
		required: true,
	},
	likes: Number,
	comments: {
		type: Array,
		default: [],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Blog', blogSchema)
