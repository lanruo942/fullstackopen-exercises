/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 11:24:05
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-13 15:24:19
 */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
	const users = useSelector((state) => state.users)

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users
