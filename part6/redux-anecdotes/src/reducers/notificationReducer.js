/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 03:02:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-06 12:42:26
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationReducer = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		changeNotification(state, action) {
			return action.payload
		},
		clearNotification(state, action) {
			return null
		}
	}
})

export const { changeNotification, clearNotification } = notificationReducer.actions

export const setNotification = (content, timer = 10) => {
	return (dispatch) => {
		dispatch(changeNotification(content))
		setTimeout(() => {
			dispatch(clearNotification())
			console.log(timer)
		}, timer * 1000)
	}
}
export default notificationReducer.reducer