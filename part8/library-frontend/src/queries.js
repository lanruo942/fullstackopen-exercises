/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 03:00:09
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-18 03:04:01
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
