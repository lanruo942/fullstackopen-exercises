/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:09
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 17:09:04
 */
import React, { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/messageReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
			navigate('/')
		} catch (exception) {
			dispatch(setMessage('wrong username or password', 'error'))
		}
	}

	return (
		<div>
			<h2>log in to application</h2>

			<Notification />

			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="Username">username</label>
					<input
						id="username"
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="Password">password</label>
					<input
						id="password"
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id="login-button" type="submit">
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
