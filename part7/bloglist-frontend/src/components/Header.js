/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 17:15:36
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 00:37:21
 */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Header = ({ title = 'blogs' }) => {
	const user = useSelector((state) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		blogService.setToken(null)
		dispatch(setUser(null))
		navigate('/')
	}

	return (
		<div>
			<h2>{title}</h2>

			<Notification />

			<p>
				{user.name} logged-in
				<button onClick={handleLogout}>logout</button>
			</p>
		</div>
	)
}

export default Header
