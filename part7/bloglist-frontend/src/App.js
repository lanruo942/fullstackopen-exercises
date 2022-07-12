/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 11:45:21
 */
import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogsList from './components/Blogs/List'
import BlogsForm from './components/Blogs/Form'
import Togglable from './components/Togglable'
import Users from './components/Users'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsersInfo } from './reducers/usersInfoReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
	const user = useSelector((state) => state.user)
	const blogFormRef = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsersInfo())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
	}, [])

	return (
		<div>
			{user === null ? (
				<LoginForm />
			) : (
				<BlogsList user={user}>
					<Users />
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogsForm />
					</Togglable>
				</BlogsList>
			)}
		</div>
	)
}

export default App
