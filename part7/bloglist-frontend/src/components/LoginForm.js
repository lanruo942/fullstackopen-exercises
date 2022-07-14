/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:09
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 00:19:06
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
		<div className="flex flex-col items-center mt-80 pb-48">
			<h2 className="text-4xl font-semibold mb-7">log in to application</h2>

			<Notification />

			<form onSubmit={handleLogin}>
				<div>
					<label className="block" htmlFor="Username">
						username
					</label>
					<input
						id="username"
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
						className="w-72 p-2 rounded-md border-2 border-gray-300"
					/>
				</div>
				<div>
					<label className="block" htmlFor="Password">
						password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
						className="w-72 p-2 rounded-md border-2 border-gray-300"
					/>
				</div>
				<button
					id="login-button"
					type="submit"
					className="border-solid border-slate-600 border-2 rounded-md px-10 py-2 mt-3 mx-auto block hover:bg-slate-600 hover:text-white"
				>
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
