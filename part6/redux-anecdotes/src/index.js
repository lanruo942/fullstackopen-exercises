/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:02:37
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 17:11:39
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)
