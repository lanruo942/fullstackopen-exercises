/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:21
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 17:22:50
 */
import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogsList = ({ children }) => {
	const blogs = useSelector((state) => state.blogs)

	return (
		<div>
			{children}

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default BlogsList
