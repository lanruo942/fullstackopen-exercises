/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:49:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-04 03:04:50
 */
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
	}

	return (
		<form onSubmit={addAnecdote}>
      <div><input type="text" name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
	)
}

export default AnecdoteForm