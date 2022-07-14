/*
 * @Author: Summer Lee
 * @Date: 2022-07-12 11:24:05
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 01:52:29
 */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from './Header'

const Users = () => {
	const users = useSelector((state) => state.users)

	return (
		<div className="mx-3">
			<Header title="users" />
			<table className="table-auto border-separate border-slate-500">
				<thead>
					<tr>
						<th>name</th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link className="hover:text-slate-500" to={`/users/${user.id}`}>
									{user.name}
								</Link>
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
