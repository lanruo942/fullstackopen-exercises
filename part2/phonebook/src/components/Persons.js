/*
 * @Author: Summer Lee
 * @Date: 2022-03-07 12:33:35
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-12 21:10:57
 */
import React from 'react'

const Person = ({ person, handleDelete }) => (
	<tr>
		<td>{person.name}</td>
		<td>{person.number}</td>
		<td><button onClick={handleDelete}>delete</button></td>
	</tr>
)

const Persons = ({ persons, results, delPersonOf }) => {
	const personList = results.length ? results : persons
	
	return (
		<table>
			<tbody>
				{personList.map(person =>
					<Person key={person.id} person={person} handleDelete={() => delPersonOf(person.id)} />
				)}
			</tbody>
		</table>
	)
}

export default Persons