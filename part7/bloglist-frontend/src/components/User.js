/*
 * @Author: Summer Lee
 * @Date: 2022-07-13 00:37:46
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 01:04:36
 */
import React from 'react'
import Header from './Header'

const User = ({ user }) => {
	return (
		<div>
			<Header title="blogs" />
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}

export default User
