/*
 * @Author: Summer Lee
 * @Date: 2022-03-13 13:41:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-13 13:54:32
 */
import React from 'react'
import './Notification.css'

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}
	
  return (
		<div className='message'>{message}</div>
	)
}

export default Notification