/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:49:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-06 12:43:11
 */
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
		dispatch(setNotification(`added ${content}`, 5))
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