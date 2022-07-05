/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:49:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-06 01:06:44
 */
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		const newAnecdote = await anecdoteService.create(content)
		dispatch(createAnecdote(newAnecdote))
		dispatch(setNotification(`added ${content}`))
		setTimeout(() => {
			dispatch(clearNotification())
		}, 5000)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input type="text" name="anecdote" /></div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm