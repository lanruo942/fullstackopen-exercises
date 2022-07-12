/*
 * @Author: Summer Lee
 * @Date: 2022-07-11 21:17:44
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 03:32:23
 */
import { createSlice } from '@reduxjs/toolkit'
import { changeMessageStatus } from './messageStatusReducer'

let prevSetTimeout = null

const messageSlice = createSlice({
	name: 'message',
	initialState: null,
	reducers: {
		changeMessage(state, action) {
			return action.payload
		},
		clearMessage(state) {
			return null
		},
	},
})

export const { changeMessage, clearMessage } = messageSlice.actions

export const setMessage = (message, messageStatus = 'success', timer = 5) => {
	return (dispatch) => {
		dispatch(changeMessage(message))
		dispatch(changeMessageStatus(messageStatus))
		clearTimeout(prevSetTimeout)
		prevSetTimeout = setTimeout(() => {
			dispatch(clearMessage())
		}, timer * 1000)
	}
}

export default messageSlice.reducer
