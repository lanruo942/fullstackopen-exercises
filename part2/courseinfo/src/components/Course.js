/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 10:25:25
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-06 11:29:31
 */
import React from 'react'

const Header = ({ course }) => {
	return (
		<h2>{course.name}</h2>
	)
}

const Part = ({ name, exercises }) => {
	return (
		<p>{name} {exercises}</p>
	)
}

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(({ id, name, exercises }) => 
				<Part key={id} name={name} exercises={exercises} />
			)}
		</div>
	)
}

const Total = ({ parts }) => {
	return (
		<p><strong>Total of {parts.reduce((sum, part) => sum += part.exercises, 0)} exercises</strong></p>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course