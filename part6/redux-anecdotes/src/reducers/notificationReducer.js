/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 03:02:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-07 13:25:25
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let prevSetTimeout = null

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
		clearTimeout(prevSetTimeout)
		prevSetTimeout = setTimeout(() => {
			dispatch(clearNotification())
		}, timer * 1000)

	}
}

export default notificationReducer.reducer