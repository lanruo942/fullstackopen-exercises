/*
 * @Author: Summer Lee
 * @Date: 2022-07-08 03:00:03
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-08 23:47:28
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<App />
	</Router>
)