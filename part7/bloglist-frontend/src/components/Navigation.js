/*
 * @Author: Summer Lee
 * @Date: 2022-07-13 15:37:31
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 15:42:01
 */
import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'

const NavigationDiv = styled.div`
	background: #f5f5f5;
	padding: 1em;
`

const Navigation = () => {
	const loginUser = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()

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
		<NavigationDiv>
			<Link style={padding} to="/blogs">
				blogs
			</Link>
			<Link style={padding} to="/users">
				users
			</Link>
			<span>
				{loginUser.name} logged-in
				<button onClick={handleLogout}>logout</button>
			</span>
		</NavigationDiv>
	)
}

export default Navigation
