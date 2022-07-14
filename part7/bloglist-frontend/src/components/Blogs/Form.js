/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 17:52:36
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 00:48:27
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
			<h2 className="text-xl font-semibold mb-2">Create a new blog</h2>
			<form className="mb-2" onSubmit={addBlog}>
				<div className="mb-2">
					<label htmlFor="Title">title: </label>
					<input
						id="blog-title"
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
						className="w-auto px-2 rounded-md border-2 border-gray-300"
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="Author">author: </label>
					<input
						id="blog-author"
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
						className="w-auto px-2 rounded-md border-2 border-gray-300"
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="Url">url: </label>
					<input
						id="blog-url"
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
						className="w-auto px-2 rounded-md border-2 border-gray-300"
					/>
				</div>
				<button
					id="create-button"
					type="submit"
					className="bg-slate-200 py-1 px-2 rounded"
				>
					create
				</button>
			</form>
		</div>
	)
}

export default BlogsForm
