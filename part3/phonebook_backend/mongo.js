/*
 * @Author: Summer Lee
 * @Date: 2022-03-16 18:04:50
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-16 21:02:10
 */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.n5tbr.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
	Person.find({}).then(results => {
		console.log('phonebook:')
		results.forEach(result => {
			console.log(result.name, result.number)
		})
		mongoose.connection.close()
	})
} else {
	const name = process.argv[3]
	const number = process.argv[4]

	const person = new Person({
		name,
		number,
	})

	person.save().then(result => {
		console.log(`added ${result.name} number ${result.number} to phonebook`)
		mongoose.connection.close()
	})
}