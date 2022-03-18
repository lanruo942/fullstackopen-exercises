/*
 * @Author: Summer Lee
 * @Date: 2022-03-18 14:40:11
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-18 14:50:10
 */
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB: ', error.message)
	})

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)