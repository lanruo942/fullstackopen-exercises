/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 03:13:07
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-23 04:09:36
 */
import React, { useState } from 'react'
import './Blog.css'


const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const [buttonStatus, setButtonStatus] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonStatus(buttonStatus === 'view' ? 'hide' : 'view')
  }

  return (
    <div className="blog-style">
      {blog.title}&nbsp;
      <button onClick={toggleVisibility}>{buttonStatus}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog