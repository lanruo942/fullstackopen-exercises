/*
 * @Author: Summer Lee
 * @Date: 2022-06-30 03:24:57
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-06-30 03:48:39
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogsForm from './Form'

describe('<BlogsForm />', () => {
	test('create a new blog', async () => {
		const createBlog = jest.fn()
		const user = userEvent.setup()

		const { container } = render(<BlogsForm createBlog={createBlog} />)

		const titleInput = container.querySelector('#blog-title')
		const authorInput = container.querySelector('#blog-author')
		const urlInput = container.querySelector('#blog-url')
		const sendButton = screen.getByText('create')

		await user.type(titleInput, 'test title')
		await user.type(authorInput, 'test author')
		await user.type(urlInput, 'test url')
		await user.click(sendButton)

		expect(createBlog.mock.calls[0][0]).toEqual({
			title: 'test title',
			author: 'test author',
			url: 'test url',
		})
	})
})
