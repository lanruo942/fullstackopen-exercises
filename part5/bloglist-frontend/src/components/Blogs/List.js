/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:21
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-23 04:22:34
 */
import React from 'react'
import Blog from './Blog'
import Notification from '../Notification'

const BlogsList = ({ user, blogs, updateBlog, handleLogout, message, messageStatus, children }) => (
  <div>
    <h2>blogs</h2>
    
    <Notification message={message} messageStatus={messageStatus} />
    
    <p>
      {user.name} logged-in
      <button onClick={handleLogout}>logout</button>
    </p>
  
    {children}

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
    )}
  </div>
)

export default BlogsList