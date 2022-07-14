/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 17:15:36
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 00:32:04
 */
import React from 'react'
import Notification from './Notification'

const Header = ({ title = 'blogs' }) => {
	return (
		<div>
			<h2 className="text-4xl font-semibold my-7">{title}</h2>

			<Notification />
		</div>
	)
}

export default Header
