/*
 * @Author: Summer Lee
 * @Date: 2022-03-13 13:41:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-13 14:31:48
 */
import React from 'react'
import './Notification.css'

const Notification = ({ level, message }) => {
	if (message === null) {
		return null
	}
	
  return (
		<div className={level}>{message}</div>
	)
}

export default Notification