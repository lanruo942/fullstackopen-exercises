/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 01:51:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-18 01:57:05
 */
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
	const [page, setPage] = useState('authors')

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} />
		</div>
	)
}

export default App
