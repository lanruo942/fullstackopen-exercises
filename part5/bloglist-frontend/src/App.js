/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-17 16:50:25
 */
import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {

  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  return (
    <div>
      <Notification message={errorMessage} />
      
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        /> :
        <BlogsForm
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
        />
      }
      
    </div>
  )
}

export default App
