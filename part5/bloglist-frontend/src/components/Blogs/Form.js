/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 17:52:36
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-23 03:24:42
 */
import React from 'react'

const BlogsForm = ({ title, author, url, addBlog, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={addBlog}>
				<div>
					<label htmlFor="Title">title: </label>
					<input
						type="text"
						value={title}
						name="Title"
						onChange={handleTitleChange}
					/>
				</div>
				<div>
					<label htmlFor="Author">author: </label>
					<input
						type="text"
						value={author}
						name="Author"
						onChange={handleAuthorChange}
					/>
				</div>
				<div>
					<label htmlFor="Url">url: </label>
					<input
						type="text"
						value={url}
						name="Url"
						onChange={handleUrlChange}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogsForm