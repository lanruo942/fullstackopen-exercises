/*
 * @Author: Summer Lee
 * @Date: 2022-03-07 16:08:00
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-09 16:21:33
 */
import React from 'react'

const PersonForm = (props) => (
	<form onSubmit={props.addPerson}>
		<div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
		<div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
		<div><button type="submit">add</button></div>
	</form>
)

export default PersonForm