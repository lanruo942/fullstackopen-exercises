/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 03:00:09
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-18 03:14:35
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
			author
			id
		}
	}
`
