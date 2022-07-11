/*
 * @Author: Summer Lee
 * @Date: 2022-07-11 21:52:53
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-11 21:58:34
 */
import { createSlice } from '@reduxjs/toolkit'

const messageStatusSlice = createSlice({
	name: 'messageStatus',
	initialState: 'success',
	reducers: {
		changeMessageStatus(state, action) {
			return action.payload
		},
	},
})

export const { changeMessageStatus } = messageStatusSlice.actions
export default messageStatusSlice.reducer
