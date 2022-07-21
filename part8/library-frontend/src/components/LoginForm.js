/*
 * @Author: Summer Lee
 * @Date: 2022-07-20 20:13:41
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-21 13:15:44
 */
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN)

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('library-user-token', token)
			setPage('authors')
		}
	}, [result.data]) // eslint-disable-line

	if (!show) {
		return null
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		login({ variables: { username, password } })

		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Login in library</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name{' '}
					<input
						type="text"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password{' '}
					<input
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm
