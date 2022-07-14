/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:21
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 00:49:25
 */
import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogsList = ({ children }) => {
	const blogs = useSelector((state) => state.blogs)

	return (
		<div className="mx-3">
			{children}

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default BlogsList
