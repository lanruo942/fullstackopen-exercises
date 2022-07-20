/*
 * @Author: Summer Lee
 * @Date: 2022-07-20 12:21:49
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-20 12:23:44
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 4,
	},
	favouriteGenre: String,
})

module.exports = mongoose.model('User', schema)
