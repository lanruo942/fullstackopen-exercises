/*
 * @Author: Summer Lee
 * @Date: 2022-07-08 23:48:45
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-09 00:06:49
 */
import { useState } from 'react'

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	const reset = () => {
		setValue('')
	}

	return {
		type,
		value,
		onChange,
		reset
	}
}