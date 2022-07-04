/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 03:02:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 03:27:54
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = 'you voted something...'

const notificationReducer = createSlice({
	name: 'notification',
	initialState,
})

export default notificationReducer.reducer