/*
 * @Author: Summer Lee
 * @Date: 2022-07-13 00:37:46
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 01:55:46
 */
import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
	return (
		<div className="mx-3">
			<Header title="blogs" />
			<h2 className="text-xl font-semibold mb-2">{user.name}</h2>
			<h3 className="font-semibold mb-2 mt-6">added blogs</h3>
			<ul className="ml-5">
				{user.blogs.map((blog) => (
					<li key={blog.id} className="list-decimal">
						<Link className="hover:text-slate-500" to={`/blogs/${blog.id}`}>
							{blog.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default User
