/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:02:37
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-04 02:10:06
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
