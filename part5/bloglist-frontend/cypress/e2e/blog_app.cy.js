/*
 * @Author: Summer Lee
 * @Date: 2022-07-01 02:51:01
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-01 03:05:46
 */
describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('log in to application')
		cy.get('#login-button')
			.should('contain', 'login')
	})
})