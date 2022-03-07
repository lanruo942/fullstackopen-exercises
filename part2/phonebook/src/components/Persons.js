/*
 * @Author: Summer Lee
 * @Date: 2022-03-07 12:33:35
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-07 16:06:37
 */
import React from 'react'

const Person = ({ person }) => (
	<tr>
		<td>{person.name}</td>
		<td>{person.number}</td>
	</tr>
)

const Persons = ({ persons, results }) => (
	<table>
		<tbody>
			{results.length
				? results.map(result => <Person key={result.id} person={result} />)
				: persons.map(person => <Person key={person.id} person={person} />)
			}
		</tbody>
	</table>
)

export default Persons