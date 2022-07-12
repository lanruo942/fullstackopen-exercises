/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:21
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 02:51:21
 */
import React from 'react'
import Blog from './Blog'
import Notification from '../Notification'
import { useSelector } from 'react-redux'

const BlogsList = ({ user, handleLogout, children }) => {
	const message = useSelector((state) => state.message)
	const messageStatus = useSelector((state) => state.messageStatus)
	const blogs = useSelector((state) => state.blogs)

	return (
		<div>
			<h2>blogs</h2>

			<Notification message={message} messageStatus={messageStatus} />

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
