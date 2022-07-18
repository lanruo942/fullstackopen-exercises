/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 03:33:50
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-18 22:53:38
 */
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const AuthrosForm = () => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})

	const results = useQuery(ALL_AUTHORS)
	const authors = results.data.allAuthors

	const submit = (event) => {
		event.preventDefault()

		updateAuthor({
			variables: { name, setBornTo: parseInt(born) },
		})

		setName('')
		setBorn('')
	}

	return (
		<div>
			<h3>Set birthyear</h3>
			<form onSubmit={submit}>
				<div>
					name
					<select value={name} onChange={({ target }) => setName(target.value)}>
						{authors.map((a) => (
							<option key={a.id} value={a.name}>
								{a.name}
							</option>
						))}
					</select>
				</div>
				<div>
					born
					<input
						type="number"
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	)
}

export default AuthrosForm
