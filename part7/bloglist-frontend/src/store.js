/*
 * @Author: Summer Lee
 * @Date: 2022-07-11 21:16:58
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 21:38:57
 */
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { combineReducers } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import messageStatusReducer from './reducers/messageStatusReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersInfoReducer from './reducers/usersInfoReducer'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
}

const rootReducer = combineReducers({
	message: messageReducer,
	messageStatus: messageStatusReducer,
	blogs: blogReducer,
	user: userReducer,
	users: usersInfoReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
})

export const persistor = persistStore(store)

export default store
