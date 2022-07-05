/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:02:37
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-06 01:03:28
 */
import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		anecdoteService
			.getAll()
			.then(anecdotes => dispatch(setAnecdotes(anecdotes)))
	}, [dispatch])

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App