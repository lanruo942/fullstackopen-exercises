/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:09
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-17 16:46:47
 */
import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => (
  <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="Username">username</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="Password">password</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm