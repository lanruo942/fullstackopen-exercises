/*
 * @Author: Summer Lee
 * @Date: 2022-07-13 01:27:05
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 01:45:18
 */
import React from 'react'
import Header from '../Header'
import { useDispatch } from 'react-redux'
import { likesBlog, addComment } from '../../reducers/blogReducer'

const BlogView = ({ blog }) => {
	const dispatch = useDispatch()

	const handleComment = (event) => {
		event.preventDefault()
		const comment = event.target.comment.value
		dispatch(addComment(blog.id, comment))
		event.target.comment.value = ''
	}

	return (
		<div className="mx-3">
			<Header title="blogs" />
			<h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
			<div className="mb-2">
				<a href={blog.url} className="hover:text-slate-500">
					{blog.url}
				</a>
			</div>
			<div className="mb-2">
				{blog.likes} likes{' '}
				<button
					className="bg-slate-200 px-2 rounded hover:bg-slate-600 hover:text-white"
					onClick={() => dispatch(likesBlog(blog))}
				>
					like
				</button>
			</div>
			<div className="mb-2">
				added by {blog.user ? blog.user.name : 'anonymous'}
			</div>
			<div className="mb-2">
				<h3 className="font-semibold mb-2 mt-6">comments</h3>
				<form onSubmit={handleComment}>
					<input
						className="w-auto px-2 mr-2 rounded-md border-2 border-gray-300"
						type="text"
						name="comment"
					/>
					<button
						className="bg-slate-200 px-2 rounded hover:bg-slate-600 hover:text-white"
						type="submit"
					>
						add comment
					</button>
				</form>
				<ul className="ml-5">
					{blog.comments.map((comment) => (
						<li key={comment.id} className="list-decimal">
							{comment.text}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default BlogView
