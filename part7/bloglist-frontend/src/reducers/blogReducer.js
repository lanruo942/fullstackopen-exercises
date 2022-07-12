/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 00:57:42
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 03:30:20
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
			console.log(error)
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
			dispatch(setMessage('add failed', 'error'))
		}
	}
}

export const likesBlog = (blog) => {
	return async (dispatch) => {
		const updateValue = { likes: blog.likes + 1 }
		const updatedBlog = await blogService.update(blog.id, updateValue)
		dispatch(updateBlog(updatedBlog))
	}
}

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.remove(id)
		dispatch(removeBlog(id))
	}
}

export default blogSlice.reducer
