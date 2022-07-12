/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 01:34:22
 */
import React from 'react'
import { Link } from 'react-router-dom'
import './Blog.css'

const Blog = ({ blog }) => {
	return (
		<div className="blog">
			<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
		</div>
	)
}

export default Blog
