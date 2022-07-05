/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 00:08:53
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 17:23:03
 */
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		notification: notificationReducer,
		filter: filterReducer
	}
})

export default store