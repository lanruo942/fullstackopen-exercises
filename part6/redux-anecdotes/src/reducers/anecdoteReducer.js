import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteReducer = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload)
		},
		update(state, action) {
			const updatedAnecdote = action.payload

			return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote).sort((prev, next) => next.votes - prev.votes)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { createAnecdote, update, setAnecdotes } = anecdoteReducer.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export default anecdoteReducer.reducer