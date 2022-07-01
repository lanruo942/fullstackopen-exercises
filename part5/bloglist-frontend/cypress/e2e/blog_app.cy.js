/*
 * @Author: Summer Lee
 * @Date: 2022-07-01 02:51:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-01 09:04:30
 */
describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')

		const user = {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen'
		}

		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('log in to application')
		cy.get('#login-button')
			.should('contain', 'login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.login({ username: 'mluukkai', password: 'salainen' })
			cy.contains('Matti Luukkainen logged-in')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('mluukkai')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'Wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')

			cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'mluukkai', password: 'salainen' })
		})

		it('A blog can be created', function () {
			cy.contains('new blog').click()
			cy.get('#blog-title').type('a blog created by cypress')
			cy.get('#blog-author').type('Cypress')
			cy.get('#blog-url').type('https://google.com')
			cy.get('#create-button').click()
			cy.contains('a blog created by cypress')
		})

		describe('and a blog exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'another blog cypress',
					author: 'Cypress',
					url: 'https://google.com'
				})
			})

			it('it can be likes', function () {
				cy.contains('another blog cypress')
					.find('.visible-button')
					.click()

				cy.contains('another blog cypress')
					.find('.like-button')
					.click()

				cy.get('.like-button')
					.parent()
					.should('contain', 'likes 1')
			})
		})

		describe('and several blogs exist', function () {
			beforeEach(function () {
				cy.createBlog({ title: 'first blog', author: 'Cypress', url: '/' })
				cy.createBlog({ title: 'second blog', author: 'Cypress', url: '/' })
				cy.createBlog({ title: 'third blog', author: 'Cypress', url: '/' })
			})

			it('one of those can be likes', function () {
				cy.contains('second blog')
					.find('.visible-button')
					.click()

				cy.contains('second blog')
					.find('.like-button')
					.click()

				cy.contains('second blog')
					.find('.like-button')
					.parent()
					.should('contain', 'likes 1')
			})
		})
	})
})