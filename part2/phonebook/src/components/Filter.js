/*
 * @Author: Summer Lee
 * @Date: 2022-03-07 16:07:47
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-12 20:58:28
 */
import React from 'react'

const Filter = ({ handleNewSearch }) => (
	<div>filter shown with <input onInput={handleNewSearch} /></div>
)

export default Filter