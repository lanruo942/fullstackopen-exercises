/*
 * @Author: Summer Lee
 * @Date: 2022-07-20 23:55:05
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-21 13:53:19
 */
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
	const me = useQuery(ME)
	const books = useQuery(ALL_BOOKS)

	if (!show) {
		return null
	} else {
		me.startPolling()
	}

	if (books.loading || !me.data.me) {
		return <div>Loading...</div>
	} else {
		me.stopPolling()
	}

	const favoriteGenre = me.data.me?.favouriteGenre
	const booksToShow = books.data.allBooks.filter((b) =>
		b.genres.includes(favoriteGenre)
	)

	return (
		<div>
			<h2>recommendations</h2>
			<p>books in your favorite genre {favoriteGenre}</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksToShow.map((b) => (
						<tr key={b.id}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Recommend
