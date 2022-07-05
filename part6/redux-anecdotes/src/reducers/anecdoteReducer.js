import { createSlice } from '@reduxjs/toolkit'

const anecdoteReducer = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			const content = action.payload
			state.push({
				content,
				votes: 0
			})
		},
		vote(state, action) {
			const id = action.payload
			const anecdoteToChange = state.find(a => a.id === id)

			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1
			}

			return state.map(a => a.id !== id ? a : changedAnecdote).sort((prev, next) => next.votes - prev.votes)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteReducer.actions
export default anecdoteReducer.reducer