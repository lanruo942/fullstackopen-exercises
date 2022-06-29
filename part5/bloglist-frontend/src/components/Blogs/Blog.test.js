/*
 * @Author: Summer Lee
 * @Date: 2022-06-30 01:44:31
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-30 03:15:37
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
	test('by default, show title and author, hide url and likes', () => {
		const blog = {
			title: 'test blog',
			author: 'test author',
			url: 'test url',
			likes: 0
		}

		const { container } = render(<Blog blog={blog} />)

		const titleElement = screen.getByText('test blog', { exact: false })
		const authorElement = screen.getByText('test author', { exact: false })
		const blogInfoDiv = container.querySelector('.blog-info')

		expect(titleElement).toBeDefined()
		expect(authorElement).toBeDefined()
		expect(blogInfoDiv).toHaveStyle('display: none')
	})

	test('after clicking the view button, blog-info is displayed', async () => {
		const blog = {
			title: 'test blog',
			author: 'test author',
			url: 'test url',
			likes: 0
		}

		const { container } = render(<Blog blog={blog} />)

		const user = userEvent.setup()
		const button = screen.getByText('view')
		await user.click(button)

		const blogInfoDiv = container.querySelector('.blog-info')
		expect(blogInfoDiv).not.toHaveStyle('display: none')
	})

	test('after click the likes button twice, calls event handler twice', async () => {
		const blog = {
			title: 'test blog',
			author: 'test author',
			url: 'test url',
			likes: 0
		}

		const mockHandler = jest.fn()

		const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />)

		const user = userEvent.setup()
		const button = screen.getByText('like')
		await user.dblClick(button)

		// expect(mockHandler.mock.calls).toHaveLength(2)
		expect(mockHandler).toHaveBeenCalledTimes(2)
	})
})
