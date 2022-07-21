/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 01:51:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-22 03:02:58
 */
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FIND_BOOKS } from '../queries'

const Books = (props) => {
	const [genre, setGenre] = useState(null)
	const booksResults = useQuery(ALL_BOOKS)
	const findBooksResults = useQuery(FIND_BOOKS, {
		variables: { genre },
		fetchPolicy: 'network-only',
	})

	if (!props.show) {
		return null
	}

	if (findBooksResults.loading || booksResults.loading) {
		return <div>Loading...</div>
	}

	const books = booksResults.data.allBooks
	const findBooks = findBooksResults.data.allBooks
	const genres = [...new Set(books.map((b) => b.genres).flat())]

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
					{findBooks.map((a) => (
						<tr key={a.id}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				{genres.map((genre) => (
					<button key={genre} onClick={() => setGenre(genre)}>
						{genre}
					</button>
				))}
				<button onClick={() => setGenre(null)}>all genres</button>
			</div>
		</div>
	)
}

export default Books
