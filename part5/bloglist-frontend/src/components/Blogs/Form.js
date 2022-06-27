/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 17:52:36
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-27 16:20:45
 */
import React, { useState } from 'react'

const BlogsForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = event => {
		event.preventDefault()

		createBlog({
			title: title,
			author: author,
			url: url,
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					<label htmlFor="Title">title: </label>
					<input
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="Author">author: </label>
					<input
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="Url">url: </label>
					<input
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogsForm