/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 00:08:53
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 03:21:49
 */
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		notification: notificationReducer
	}
})

export default store