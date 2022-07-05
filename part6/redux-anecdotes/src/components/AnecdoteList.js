/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 03:06:25
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-06 02:03:49
 */
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
	})
	const dispatch = useDispatch()

	return (
		<div>
			{anecdotes.map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={
						async () => {
							const updateValue = { votes: anecdote.votes + 1 }
							const updatedAnecdote = await anecdoteService.update(anecdote.id, updateValue)
							dispatch(update(updatedAnecdote))
							dispatch(setNotification(`you voted ${anecdote.content}`))
							setTimeout(() => {
								dispatch(clearNotification())
							}, 5000)
						}}
				/>
			)}
		</div>
	)
}

export default AnecdoteList