/*
 * @Author: Summer Lee
 * @Date: 2022-07-13 01:27:05
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 01:43:34
 */
import React from 'react'
import Header from '../Header'
import { useDispatch } from 'react-redux'
import { likesBlog } from '../../reducers/blogReducer'

const BlogView = ({ blog }) => {
	const dispatch = useDispatch()

	console.log(blog)
	return (
		<div>
			<Header title="blogs" />
			<h2>{blog.title}</h2>
			<div>
				<a href={blog.url}>{blog.url}</a>
			</div>
			<div>
				{blog.likes} likes{' '}
				<button onClick={() => dispatch(likesBlog(blog))}>like</button>
			</div>
			<div>added by {blog.user ? blog.user.name : 'anonymous'}</div>
		</div>
	)
}

export default BlogView
