/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 10:25:25
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-06 10:47:03
 */
import React from 'react'

const Header = ({ course }) => {
	return (
		<h1>{course.name}</h1>
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
		<p>Number of exercises {parts.reduce((sum, part) => sum += part.exercises, 0)}</p>
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