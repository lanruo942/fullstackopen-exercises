/*
 * @Author: Summer Lee
 * @Date: 2022-03-18 14:40:11
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-21 12:28:07
 */
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB: ', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		required: true
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)