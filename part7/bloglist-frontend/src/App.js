/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 01:37:28
 */
import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogsList from './components/Blogs/List'
import BlogsForm from './components/Blogs/Form'
import Togglable from './components/Togglable'
import Header from './components/Header'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/Blogs/View'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsersInfo } from './reducers/usersInfoReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'

const App = () => {
	const loginUser = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)
	const blogs = useSelector((state) => state.blogs)
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

	const userMatch = useMatch('/users/:id')
	const blogMatch = useMatch('/blogs/:id')
	const user = userMatch
		? users.find((u) => u.id === userMatch.params.id)
		: null
	const blog = blogMatch
		? blogs.find((b) => b.id === blogMatch.params.id)
		: null

	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={
						loginUser ? (
							<Navigate replace to="/blogs" />
						) : (
							<Navigate replace to="/login" />
						)
					}
				/>
				<Route
					path="/blogs"
					element={
						<BlogsList>
							<Header />
							<Togglable buttonLabel="new blog" ref={blogFormRef}>
								<BlogsForm />
							</Togglable>
						</BlogsList>
					}
				/>
				<Route path="/blogs/:id" element={<BlogView blog={blog} />} />
				<Route
					path="/users"
					element={
						<div>
							<Header title="Users" />
							<Users />
						</div>
					}
				/>
				<Route path="/users/:id" element={<UserView user={user} />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</div>
	)
}

export default App
