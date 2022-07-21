/*
 * @Author: Summer Lee
 * @Date: 2022-07-21 23:15:07
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-22 01:48:16
 */
const { UserInputError, AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			let books
			const author = await Author.findOne({ name: args.author })

			if (!args.author && !args.genre) {
				books = await Book.find({}).populate('author')
			} else if (args.author && !args.genre) {
				books = await Book.find({ author: author._id }).populate('author')
			} else if (!args.author && args.genre) {
				books = await Book.find({ genres: args.genre }).populate('author')
			} else {
				books = await Book.find({
					author: author._id,
					genres: args.genre,
				}).populate('author')
			}

			return books.map((book) => {
				return {
					...book._doc,
					id: book._id.toString(),
					author: {
						...book.author._doc,
						id: book.author._id.toString(),
						bookCount: books.filter(
							(b) => b.author._id.toString() === book.author._id.toString()
						).length,
					},
				}
			})
		},
		allAuthors: async () => {
			const authors = await Author.find({})
			const books = await Book.find({})
			return authors.map((author) => {
				return {
					name: author.name,
					born: author.born,
					id: author.id,
					bookCount: books.filter(
						(book) => book.author._id.toString() === author._id.toString()
					).length,
				}
			})
		},
		me: (root, args, context) => {
			return context.currentUser
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const bookInDb = await Book.findOne({ title: args.title })
			if (bookInDb) {
				throw new UserInputError('Book already exists', {
					invalidArgs: args.title,
				})
			}

			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author })
				await author.save().catch((error) => {
					throw new UserInputError(error.message, {
						invalidArgs: args.author,
					})
				})
			}

			const book = new Book({ ...args, author: author._id })
			await book.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			})

			const books = await Book.find({})

			const returnedBook = {
				...book._doc,
				id: book._id.toString(),
				author: {
					...author._doc,
					id: author._id.toString(),
					bookCount: books.filter(
						(book) => book.author._id.toString() === author._id.toString()
					).length,
				},
			}

			pubsub.publish('BOOK_ADDED', { bookAdded: returnedBook })

			return returnedBook
		},
		addAuthor: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const author = new Author({ ...args })
			await author.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			})
			return author
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const author = await Author.findOne({ name: args.name })
			if (!author) {
				return null
			}

			const books = await Book.find({ author: author._id })

			author.born = Number(args.setBornTo)
			await author.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			})

			return {
				...author._doc,
				id: author._id.toString(),
				bookCount: books.filter(
					(b) => b.author._id.toString() === author._id.toString()
				).length,
			}
		},
		createUser: async (root, args) => {
			const user = new User({ ...args })
			await user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			})
			return user
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
			if (!user || args.password !== 'password') {
				throw new UserInputError('wrong credentials')
			}

			const token = jwt.sign(
				{ username: args.username, id: user._id },
				process.env.SECRET
			)

			return { value: token }
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
		},
	},
}

module.exports = resolvers
