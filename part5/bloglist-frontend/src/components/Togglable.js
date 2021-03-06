/*
 * @Author: Summer Lee
 * @Date: 2022-06-23 03:14:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-27 16:50:01
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
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable