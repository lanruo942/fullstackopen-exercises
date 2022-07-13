/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 17:15:36
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 15:36:36
 */
import React from 'react'
import Notification from './Notification'

const Header = ({ title = 'blogs' }) => {
	return (
		<div>
			<h2>{title}</h2>

			<Notification />
		</div>
	)
}

export default Header
