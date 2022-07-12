/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 01:24:45
 */
import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogsList from './components/Blogs/List'
import BlogsForm from './components/Blogs/Form'
import Togglable from './components/Togglable'
import Header from './components/Header'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsersInfo } from './reducers/usersInfoReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'

const App = () => {
	const loginUser = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)
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

	const match = useMatch('/users/:id')
	const user = match ? users.find((u) => u.id === match.params.id) : null

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
				<Route
					path="/users"
					element={
						<div>
							<Header title="Users" />
							<Users />
						</div>
					}
				/>
				<Route path="/users/:id" element={<User user={user} />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</div>
	)
}

export default App
