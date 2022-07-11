/*
 * @Author: Summer Lee
 * @Date: 2022-07-11 21:16:58
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-11 21:54:16
 */
import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import messageStatusReducer from './reducers/messageStatusReducer'

const store = configureStore({
	reducer: {
		message: messageReducer,
		messageStatus: messageStatusReducer,
	},
})

export default store
