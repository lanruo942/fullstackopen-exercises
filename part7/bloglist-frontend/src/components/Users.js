/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 11:24:05
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-12 11:48:21
 */
import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {
	return (
		<tr>
			<td>{user.name}</td>
			<td>{user.blogs.length}</td>
		</tr>
	)
}

const Users = () => {
	const users = useSelector((state) => state.users)
	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<User key={user.id} user={user} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users
