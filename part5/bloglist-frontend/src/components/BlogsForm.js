/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:45:21
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-17 16:49:18
 */
import React from 'react'
import Blog from './Blog'

const BlogsForm = ({ user, blogs, handleLogout }) => (
  <div>
    <h2>blogs</h2>
    <p>
      {user.name} logged-in
      <button onClick={handleLogout}>logout</button>
    </p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default BlogsForm