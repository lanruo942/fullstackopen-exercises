/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:49:53
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-11 21:54:39
 */
import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
	const message = useSelector((state) => state.message)
	const messageStatus = useSelector((state) => state.messageStatus)

	if (message === null) {
		return null
	}

	return <div className={messageStatus}>{message}</div>
}

export default Notification
