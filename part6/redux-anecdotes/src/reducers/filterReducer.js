/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 17:09:34
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 17:39:55
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterReducer = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		filterChange(state, action) {
			return action.payload
		}
	}
})

export const { filterChange } = filterReducer.actions
export default filterReducer.reducer