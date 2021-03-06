/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-01 17:24:05
 */
import React, { useState } from 'react'
import './Blog.css'


const Blog = ({ username, blog, updateBlog, removeBlog }) => {
	const [visible, setVisible] = useState(false)
	const [buttonStatus, setButtonStatus] = useState('view')

	const showWhenVisible = { display: visible ? '' : 'none' }
	const buttonVisible = { display: blog.user && username === blog.user.username ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
		setButtonStatus(buttonStatus === 'view' ? 'hide' : 'view')
	}

	return (
		<div className="blog">
			{blog.title}&nbsp;{blog.author}&nbsp;
			<button className="visible-button" onClick={toggleVisibility}>{buttonStatus}</button>
			<div style={showWhenVisible} className="blog-info">
				<p>{blog.url}</p>
				<p>likes {blog.likes} <button className="like-button" onClick={() => updateBlog(blog.id)}>like</button></p>
				<button className="remove-button" style={buttonVisible} onClick={() => removeBlog(blog.id)}>remove</button>
			</div>
		</div>
	)
}

export default Blog