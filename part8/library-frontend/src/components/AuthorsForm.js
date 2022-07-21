/*
 * @Author: Summer Lee
 * @Date: 2022-07-18 03:33:50
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-21 12:31:47
 */
import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const AuthrosForm = () => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [updateAuthor] = useMutation(UPDATE_AUTHOR)

	const results = useQuery(ALL_AUTHORS)
	const authors = results.data.allAuthors

	useEffect(() => {
		if (authors) {
			setName(authors[0].name)
		}
	}, [authors])

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
