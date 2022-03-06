/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 10:15:24
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-06 10:27:32
 */
import React from 'react'
import Course from './components/Course'

const App = () => {
	const course = {
    id: 1,
		name: 'Half Stack application development',
		parts: [
			{
        id: 1,
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
        id: 2,
				name: 'Using props to pass data',
				exercises: 7
			},
			{
        id: 3,
				name: 'State of a component',
				exercises: 14
			}
		] 
	}

	return <Course course={course} />
}

export default App