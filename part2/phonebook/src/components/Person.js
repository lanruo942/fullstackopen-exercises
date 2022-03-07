/*
 * @Author: Summer Lee
 * @Date: 2022-03-07 12:33:35
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-07 14:31:39
 */
import React from 'react'

const Person = ({ person }) => (
	<tr>
		<td>{person.name}</td>
		<td>{person.number}</td>
	</tr>
)

export default Person