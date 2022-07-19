/*
 * @Author: Summer Lee
 * @Date: 2022-07-19 23:40:03
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-19 23:56:24
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 4,
	},
	born: {
		type: Number,
	},
})

module.exports = mongoose.model('Author', schema)
