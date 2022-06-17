/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:49:53
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-17 16:50:16
 */
import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification