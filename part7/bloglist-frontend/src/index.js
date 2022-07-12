/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 21:13:32
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import store, { persistor } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router>
				<App />
			</Router>
		</PersistGate>
	</Provider>
)
