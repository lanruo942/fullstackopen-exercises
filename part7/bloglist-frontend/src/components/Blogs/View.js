/*
 * @Author: Summer Lee
 * @Date: 2022-07-13 01:27:05
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-14 00:37:00
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
			<div>
				<h3>comments</h3>
				<form onSubmit={handleComment}>
					<input type="text" name="comment" />
					<button type="submit">add comment</button>
				</form>
				<ul>
					{blog.comments.map((comment) => (
						<li key={comment.id}>{comment.text}</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default BlogView
