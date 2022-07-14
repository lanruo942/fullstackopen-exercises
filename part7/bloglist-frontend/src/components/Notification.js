/*
 * @Author: Summer Lee
 * @Date: 2022-06-17 16:49:53
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 00:39:27
 */
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const message = useSelector((state) => state.message)
	const messageStatus = useSelector((state) => state.messageStatus)

	if (message === null) {
		return null
	}

	return (
		<>
			{messageStatus === 'success' ? (
				<div className="w-72 text-green-600 rounded-md border-green-600 mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 inline-block pr-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{message}
				</div>
			) : (
				<div className="w-72 text-rose-500 rounded-md border-rose-500 mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 inline-block pr-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{message}
				</div>
			)}
		</>
	)
}

export default Notification
