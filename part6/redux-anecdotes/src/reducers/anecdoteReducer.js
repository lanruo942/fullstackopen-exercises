import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteReducer = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		updateAnecdote(state, action) {
			const updatedAnecdote = action.payload

			return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote).sort((prev, next) => next.votes - prev.votes)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteReducer.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {
		const createdAnecdote = await anecdoteService.create(content)
		dispatch(appendAnecdote(createdAnecdote))
	}
}

export const voteAnecdote = (anecdote) => {
	return async dispatch => {
		const updateValue = { votes: anecdote.votes + 1 }
		const updatedAnecdote = await anecdoteService.update(anecdote.id, updateValue)
		dispatch(updateAnecdote(updatedAnecdote))
	}
}

export default anecdoteReducer.reducer