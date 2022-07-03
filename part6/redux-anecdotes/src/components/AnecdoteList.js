/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 03:06:25
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-04 03:15:08
 */
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	return (
		<div>
			{anecdotes.map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => dispatch(vote(anecdote))}
				/>
			)}
		</div>
	)
}

export default AnecdoteList