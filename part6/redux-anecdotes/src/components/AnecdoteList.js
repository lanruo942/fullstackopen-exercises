/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 03:06:25
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-06 03:27:04
 */
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

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
							dispatch(voteAnecdote(anecdote))
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