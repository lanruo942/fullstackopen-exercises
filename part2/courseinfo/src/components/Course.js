/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 10:25:25
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-06 10:34:50
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

const Total = (props) => {
	return (
		<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
			<Content parts={course.parts} />
		</div>
	)
}

export default Course