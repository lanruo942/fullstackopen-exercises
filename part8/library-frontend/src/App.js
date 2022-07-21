/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 01:51:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-22 03:05:34
 */
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED, ALL_AUTHORS, ALL_BOOKS, FIND_BOOKS } from './queries'

const App = () => {
	const [token, setToken] = useState(null)
	const [page, setPage] = useState('login')
	const client = useApolloClient()

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
				return {
					allBooks: allBooks.concat(addedBook),
				}
			})
			client.cache.updateQuery(
				{ query: FIND_BOOKS, variables: { genre: null } },
				({ allBooks }) => {
					return {
						allBooks: allBooks.concat(addedBook),
					}
				}
			)
			client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
				return {
					allAuthors: allAuthors.concat(addedBook.author),
				}
			})
		},
	})

	useEffect(() => {
		const token = localStorage.getItem('library-user-token')
		if (token) {
			setToken(token)
			setPage('authors')
		}
	}, [])

	const handleLogout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
		setPage('login')
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommend')}>recommend</button>
						<button onClick={handleLogout}>logout</button>
					</>
				) : (
					<button onClick={() => setPage('login')}>login</button>
				)}
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} />

			<Recommend show={page === 'recommend'} />

			<LoginForm
				show={page === 'login'}
				setToken={setToken}
				setPage={setPage}
			/>
		</div>
	)
}

export default App
