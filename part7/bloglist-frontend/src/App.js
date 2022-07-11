/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-11 22:10:11
 */
import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogsList from './components/Blogs/List'
import BlogsForm from './components/Blogs/Form'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setMessage } from './reducers/messageReducer'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			// const orderBlogs = _.orderBy(blogs, 'likes', 'desc')
			setBlogs(blogs.sort((prev, next) => next.likes - prev.likes))
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(setMessage('wrong username or password', 'error'))
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		blogService.setToken(null)
		setUser(null)
	}

	const addBlog = (newObject) => {
		blogFormRef.current.toggleVisibility()

		blogService.create(newObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog))
			dispatch(
				setMessage(
					`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
					'success'
				)
			)
		})
	}

	const updateBlog = (id) => {
		const blog = blogs.find((blog) => blog.id === id)
		const changeBlog = { likes: blog.likes + 1 }

		blogService
			.update(id, changeBlog)
			.then((updatedBlog) => {
				setBlogs(
					blogs
						.map((blog) => (blog.id !== id ? blog : updatedBlog))
						.sort((prev, next) => next.likes - prev.likes)
				)
			})
			.catch((error) => {
				dispatch(
					setMessage(
						`Blog '${blog.title}' was already removed from server.`,
						'error'
					)
				)
				setBlogs(blogs.filter((blog) => blog.id !== id))
			})
	}

	const removeBlog = (id) => {
		const blog = blogs.find((blog) => blog.id === id)
		const confirmInfo = `Remove blog ${blog.title} by ${blog.author}`

		if (window.confirm(confirmInfo)) {
			blogService
				.remove(id)
				.then((response) => {
					setBlogs(blogs.filter((blog) => blog.id !== id))
					dispatch(
						setMessage(
							`Blog '${blog.title}' by ${blog.author} was removed.`,
							'success'
						)
					)
				})
				.catch((error) => {
					const status = error.response.status
					let message = ''

					if (status === 401) {
						message = 'User Authentication failed.'
					}

					if (status === 403) {
						message = 'No permission.'
					}

					if (status === 404) {
						message = `Blog '${blog.title}' was already removed from server.`
						setBlogs(blogs.filter((blog) => blog.id !== id))
					}

					dispatch(setMessage(message, 'error'))
				})
		}
	}

	return (
		<div>
			{user === null ? (
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					password={password}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
				/>
			) : (
				<BlogsList
					user={user}
					blogs={blogs}
					updateBlog={updateBlog}
					removeBlog={removeBlog}
					handleLogout={handleLogout}
				>
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogsForm createBlog={addBlog} />
					</Togglable>
				</BlogsList>
			)}
		</div>
	)
}

export default App
