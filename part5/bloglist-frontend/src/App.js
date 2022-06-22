/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-23 05:24:32
 */
import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogsList from './components/Blogs/List'
import BlogsForm from './components/Blogs/Form'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )  
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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageStatus('error')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = newObject => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(newObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessageStatus('success')
        setMessage(`a new blog ${newObject.title} by ${newObject.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updateBlog = id => {
    const blog = blogs.find(blog => blog.id === id)
    const changeBlog = { likes: blog.likes + 1 }

    blogService
      .update(id, changeBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      })
      .catch(error => {
        setMessageStatus('error')
        setMessage(`Blog '${blog.title}' was already removed from server.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  return (
    <div>      
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          message={message}
          messageStatus={messageStatus}
        /> :
        <BlogsList
          user={user}
          blogs={blogs}
          updateBlog={updateBlog}
          handleLogout={handleLogout}
          message={message}
          messageStatus={messageStatus}
        >
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogsForm createBlog={addBlog} />
          </Togglable>
        </BlogsList>
      }
    </div>
  )
}

export default App
