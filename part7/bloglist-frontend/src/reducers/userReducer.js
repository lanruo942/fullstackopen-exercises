/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 10:57:44
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 10:59:08
 */
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload
		},
		clearUser(state, action) {
			return null
		},
	},
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
