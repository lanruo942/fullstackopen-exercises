/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 01:51:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-18 03:41:08
 */
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorsForm from './AuthorsForm'

const Authors = (props) => {
	const results = useQuery(ALL_AUTHORS)

	if (!props.show) {
		return null
	}

	if (results.loading) {
		return <div>Loading...</div>
	}

	const authors = results.data.allAuthors

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.id}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<AuthorsForm />
		</div>
	)
}

export default Authors
