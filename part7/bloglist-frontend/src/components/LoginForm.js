/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:09
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-01 03:26:27
 */
import React from 'react'
import Notification from './Notification'

const LoginForm = ({
	handleLogin,
	username,
	password,
	handleUsernameChange,
	handlePasswordChange,
	message,
	messageStatus,
}) => (
	<div>
		<h2>log in to application</h2>

		<Notification message={message} messageStatus={messageStatus} />

		<form onSubmit={handleLogin}>
			<div>
				<label htmlFor="Username">username</label>
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={handleUsernameChange}
				/>
			</div>
			<div>
				<label htmlFor="Password">password</label>
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={handlePasswordChange}
				/>
			</div>
			<button id="login-button" type="submit">
				login
			</button>
		</form>
	</div>
)

export default LoginForm
