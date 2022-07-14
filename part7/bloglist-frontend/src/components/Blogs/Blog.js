/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 00:57:54
 */
import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
	return (
		<div className="border-b border-slate-300 p-2">
			<Link className="hover:text-slate-500" to={`/blogs/${blog.id}`}>
				{blog.title}
			</Link>
		</div>
	)
}

export default Blog
