/*
 * @Author: Summer Lee
 * @Date: 2022-06-23 03:14:41
 * @LastEditors: Summer Lee lee@summer.today
 * @LastEditTime: 2022-07-15 00:41:29
 */
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button
					className="bg-slate-200 py-1 px-2 rounded"
					onClick={toggleVisibility}
				>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button
					className="bg-slate-200 py-1 px-2 rounded"
					onClick={toggleVisibility}
				>
					cancel
				</button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
