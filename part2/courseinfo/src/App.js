/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 10:15:24
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-06 11:28:00
 */
import React from 'react'
import Title from './components/Title'
import Course from './components/Course'

const App = () => {
  const title = 'Web development curriculum'
	const courses = [
    {
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
        },
        {
          id: 4,
          name: 'Redux',
          exercises: 11,
        }
      ] 
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          id: 1,
          name: 'Routing',
          exercises: 3,
        },
        {
          id: 2,
          name: 'Middlewares',
          exercises: 7
        }
      ]
    }
  ]

	return (
    <>
      <Title name={title} />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App