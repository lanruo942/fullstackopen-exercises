/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 03:00:09
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-20 23:36:40
 */
import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query AllAuthors {
		allAuthors {
			name
			born
			id
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query AllBooks {
		allBooks {
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
	}
`

export const FIND_BOOKS = gql`
	query FindBooks($genre: String) {
		allBooks(genre: $genre) {
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
	}
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
	}
`

export const UPDATE_AUTHOR = gql`
	mutation EditAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
			id
			bookCount
		}
	}
`

export const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`
