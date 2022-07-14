/*
 * @Author: Summer Lee
 * @Date: 2022-07-13 15:37:31
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 00:01:00
 */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'

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

	return (
		<>
			{loginUser ? (
				<nav className="bg-slate-600 py-2 px-4 flex justify-between">
					<div className="text-lg space-x-4 text-white">
						<Link className="hover:text-slate-300" to="/blogs">
							blogs
						</Link>
						<Link className="hover:text-slate-300" to="/users">
							users
						</Link>
					</div>
					<span className="text-white">
						{loginUser.name} logged-in
						<button
							className="bg-slate-50 py-1 px-2 ml-3 rounded-md text-slate-700 hover:bg-slate-700 hover:text-slate-200"
							onClick={handleLogout}
						>
							log out
						</button>
					</span>
				</nav>
			) : null}
		</>
	)
}

export default Navigation
