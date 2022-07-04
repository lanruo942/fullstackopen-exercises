/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 03:02:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 04:03:12
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationReducer = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
		clearNotification(state, action) {
			return null
		}
	}
})

export const { setNotification, clearNotification } = notificationReducer.actions
export default notificationReducer.reducer