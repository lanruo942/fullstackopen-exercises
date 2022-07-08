/*
 * @Author: Summer Lee
 * @Date: 2022-07-08 23:48:45
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-08 23:50:08
 */
import { useState } from 'react'

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}