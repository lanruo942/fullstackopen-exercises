/*
 * @Author: Summer Lee
 * @Date: 2022-07-21 23:14:54
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-22 01:35:20
 */
const { gql } = require('apollo-server-express')

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

	type Subscription {
		bookAdded: Book!
	}
`

module.exports = typeDefs
