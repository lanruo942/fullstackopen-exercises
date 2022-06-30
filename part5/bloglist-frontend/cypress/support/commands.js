/*
 * @Author: Summer Lee
 * @Date: 2022-07-01 02:50:14
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-01 03:14:30
 */
Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3001/api/login', {
		username,
		password
	}).then(({ body }) => {
		localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
		cy.visit('http://localhost:3000')
	})
})