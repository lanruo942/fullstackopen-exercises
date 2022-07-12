/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 11:37:13
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 11:44:38
 */
import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { setMessage } from './messageReducer'

const usersInfoSlice = createSlice({
	name: 'usersInfo',
	initialState: [],
	reducers: {
		setUsersInfo(state, action) {
			return action.payload
		},
	},
})

export const { setUsersInfo } = usersInfoSlice.actions

export const initializeUsersInfo = () => {
	return async (dispatch) => {
		try {
			const users = await userService.getAll()
			dispatch(setUsersInfo(users))
		} catch (error) {
			dispatch(setMessage(error.message, 'error'))
		}
	}
}

export default usersInfoSlice.reducer
