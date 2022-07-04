/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 00:08:53
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 00:10:03
 */
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'

const store = configureStore({ reducer })

export default store