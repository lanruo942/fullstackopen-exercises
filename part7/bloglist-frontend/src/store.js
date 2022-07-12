/*
 * @Author: Summer Lee
 * @Date: 2022-07-11 21:16:58
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 10:59:52
 */
import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import messageStatusReducer from './reducers/messageStatusReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
	reducer: {
		message: messageReducer,
		messageStatus: messageStatusReducer,
		blogs: blogReducer,
		user: userReducer,
	},
})

export default store
