/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 01:51:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-20 20:11:26
 */
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
	const results = useQuery(ALL_BOOKS)

	if (!props.show) {
		return null
	}

	if (results.loading) {
		return <div>Loading...</div>
	}

	const books = results.data.allBooks

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.id}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Books
