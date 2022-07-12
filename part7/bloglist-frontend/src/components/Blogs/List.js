/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:21
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 11:20:42
 */
import React from 'react'
import Blog from './Blog'
import Notification from '../Notification'
import blogService from '../../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../reducers/userReducer'

const BlogsList = ({ user, children }) => {
	const blogs = useSelector((state) => state.blogs)
	const dispatch = useDispatch()

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		blogService.setToken(null)
		dispatch(setUser(null))
	}

	return (
		<div>
			<h2>blogs</h2>

			<Notification />

			<p>
				{user.name} logged-in
				<button onClick={handleLogout}>logout</button>
			</p>

			{children}

			{blogs.map((blog) => (
				<Blog key={blog.id} username={user.username} blog={blog} />
			))}
		</div>
	)
}

export default BlogsList
