/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-18 03:38:13
 */
import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/Blogs/Form'
import BlogsCreate from './components/Blogs/Create'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addBlog = event => {
    event.preventDefault()

    const newObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(newObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setMessageStatus('success')
        setMessage(`a new blog ${newObject.title} by ${newObject.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)

  const handlePasswordChange = ({ target }) => setPassword(target.value)
  
  const handleTitleChange = ({ target }) => setTitle(target.value)

  const handleAuthorChange = ({ target }) => setAuthor(target.value)

  const handleUrlChange = ({ target }) => setUrl(target.value)

  return (
    <div>      
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          message={message}
          messageStatus={messageStatus}
        /> :
        <div>
          <BlogsForm
            user={user}
            blogs={blogs}
            handleLogout={handleLogout}
            message={message}
            messageStatus={messageStatus}
          />
          <BlogsCreate
            title={title}  
            author={author}
            url={url}
            addBlog={addBlog}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
          />
        </div>
        
      }
    </div>
  )
}

export default App
