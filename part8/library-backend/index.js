require('dotenv').config()
const {
	ApolloServer,
	UserInputError,
	gql,
	AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = gql`
	type Author {
		name: String!
		born: Int
		id: ID!
		bookCount: Int
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type User {
		username: String!
		favouriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book!
		addAuthor(name: String!, born: Int): Author
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favouriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`

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
				console.log(args.genre)

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

			return {
				...book._doc,
				id: book._id.toString(),
				author: { ...author._doc, id: author._id.toString() },
			}
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
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	},
})

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
