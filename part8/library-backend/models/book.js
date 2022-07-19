/*
 * @Author: Summer Lee
 * @Date: 2022-07-19 23:40:13
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-19 23:55:40
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		minlength: 2,
	},
	published: {
		type: Number,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author',
	},
	genres: [
		{
			type: String,
		},
	],
})

module.exports = mongoose.model('Book', schema)
