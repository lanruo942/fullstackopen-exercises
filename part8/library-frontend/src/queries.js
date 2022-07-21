/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 03:00:09
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-22 02:05:17
 */
import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		published
		author {
			name
			born
			id
		}
		genres
		id
	}
`

const AUTHOR_DETAILS = gql`
	fragment AuthorDetails on Author {
		name
		born
		id
		bookCount
	}
`

export const ALL_AUTHORS = gql`
	query AllAuthors {
		allAuthors {
			...AuthorDetails
		}
	}
	${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
	query AllBooks {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const FIND_BOOKS = gql`
	query FindBooks($genre: String) {
		allBooks(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
	mutation AddBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const UPDATE_AUTHOR = gql`
	mutation EditAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			...AuthorDetails
		}
	}
	${AUTHOR_DETAILS}
`

export const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const ME = gql`
	query Me {
		me {
			username
			favouriteGenre
			id
		}
	}
`

export const BOOK_ADDED = gql`
	subscription BookAdded {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`
