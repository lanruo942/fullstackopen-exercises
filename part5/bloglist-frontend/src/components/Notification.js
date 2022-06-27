/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:49:53
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-27 16:19:49
 */
import React from 'react'
import './Notification.css'

const Notification = ({ message, messageStatus }) => {
	if (message === null) {
		return null
	}

	return (
		<div className={messageStatus}>
			{message}
		</div>
	)
}

export default Notification