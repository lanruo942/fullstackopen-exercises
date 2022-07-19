require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const { v4: uuidv4 } = require('uuid')

const JWT_SECRET = process.env.JWT_SECRET

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

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
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
	}
`

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return Book.find({}).populate('author')
			}
			if (args.author && !args.genre) {
				return Book.find({ author: args.author }).populate('author')
			}
			if (!args.author && args.genre) {
				return Book.find({ genres: args.genre }).populate('author')
			}

			return Book.find({
				author: args.author,
				genres: { $exits: args.genre },
			}).populate('author')
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
	},
	Mutation: {
		addBook: async (root, args) => {
			const bookInDb = await Book.findOne({ title: args.title })
			if (bookInDb) {
				throw new UserInputError('Book already exists', {
					invalidArgs: args.title,
				})
			}

			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author })
				await author.save()
			}

			const book = new Book({ ...args, author: author._id })
			await book.save()

			return {
				...book._doc,
				id: book._id.toString(),
				author: { ...author._doc, id: author._id.toString() },
			}
		},
		addAuthor: async (root, args) => {
			const author = new Author({ ...args })
			await author.save()
			return author
		},
		editAuthor: (root, args) => {
			const author = authors.find((a) => a.name === args.name)
			if (!author) {
				return null
			}

			author.born = args.setBornTo
			return author
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})
