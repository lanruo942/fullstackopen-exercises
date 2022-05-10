/*
 * @Author: Summer Lee
 * @Date: 2022-05-10 12:12:49
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-05-10 12:18:41
 */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	name: String,
	passwordHash: String,
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User