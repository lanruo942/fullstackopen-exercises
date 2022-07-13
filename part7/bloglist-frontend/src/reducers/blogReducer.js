/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 00:57:42
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 19:22:24
 */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setMessage } from './messageReducer'

const blogSlice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		addBlog(state, action) {
			return [...state, action.payload]
		},
		updateBlog(state, action) {
			return state
				.map((blog) => (blog.id === action.payload.id ? action.payload : blog))
				.sort((prev, next) => next.likes - prev.likes)
		},
		removeBlog(state, action) {
			return state.filter((blog) => blog.id !== action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		},
	},
})

export const { addBlog, updateBlog, removeBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		try {
			const blogs = await blogService.getAll()
			dispatch(setBlogs(blogs.sort((prev, next) => next.likes - prev.likes)))
		} catch (error) {
			dispatch(setMessage(error.message, 'error'))
		}
	}
}

export const createBlog = (blog) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(blog)
			dispatch(addBlog(newBlog))
			dispatch(
				setMessage(
					`a new blog ${newBlog.title} by ${newBlog.author} added`,
					'success'
				)
			)
		} catch (error) {
			console.log(error)
			dispatch(setMessage(error.message, 'error'))
		}
	}
}

export const likesBlog = (blog) => {
	return async (dispatch) => {
		try {
			const updateValue = { likes: blog.likes + 1 }
			const updatedBlog = await blogService.update(blog.id, updateValue)
			dispatch(updateBlog(updatedBlog))
		} catch (error) {
			dispatch(
				setMessage(
					`Blog '${blog.title}' was already removed from server`,
					'error'
				)
			)
		}
	}
}

export const addComment = (id, comment) => {
	return async (dispatch) => {
		try {
			const updatedBlog = await blogService.addComment(id, { comment })
			dispatch(updateBlog(updatedBlog))
		} catch (error) {
			dispatch(setMessage(error.message, 'error'))
		}
	}
}

export const deleteBlog = (blog) => {
	return async (dispatch) => {
		try {
			await blogService.remove(blog.id)
			dispatch(removeBlog(blog.id))
			dispatch(
				setMessage(
					`Blog '${blog.title}' by ${blog.author} was removed`,
					'success'
				)
			)
		} catch (error) {
			const status = error.response.status
			let message = ''

			switch (status) {
				case 401:
					message = 'Your certification has expired. Please log in again.'
					break
				case 403:
					message = 'You are not authorized to delete this blog.'
					break
				case 404:
					message = `Blog '${blog.title}' was already removed from server.`
					dispatch(removeBlog(blog.id))
					break
				default:
					message = error.message
			}

			dispatch(setMessage(message, 'error'))
		}
	}
}

export default blogSlice.reducer
