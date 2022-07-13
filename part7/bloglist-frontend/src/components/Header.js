/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 17:15:36
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 15:23:17
 */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = styled.div`
	background: #f5f5f5;
	padding: 1em;
`

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

	const padding = {
		padding: 5,
	}

	return (
		<div>
			<Navigation>
				<Link style={padding} to="/blogs">
					blogs
				</Link>
				<Link style={padding} to="/users">
					users
				</Link>
				<span>
					{user.name} logged-in
					<button onClick={handleLogout}>logout</button>
				</span>
			</Navigation>
			<h2>{title}</h2>

			<Notification />
		</div>
	)
}

export default Header
