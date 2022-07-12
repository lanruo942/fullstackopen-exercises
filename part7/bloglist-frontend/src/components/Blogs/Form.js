/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 17:52:36
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 02:29:14
 */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'

const BlogsForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const dispatch = useDispatch()

	const addBlog = (event) => {
		event.preventDefault()

		dispatch(
			createBlog({
				title: title,
				author: author,
				url: url,
			})
		)

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
						id="blog-title"
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="Author">author: </label>
					<input
						id="blog-author"
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="Url">url: </label>
					<input
						id="blog-url"
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button id="create-button" type="submit">
					create
				</button>
			</form>
		</div>
	)
}

export default BlogsForm
