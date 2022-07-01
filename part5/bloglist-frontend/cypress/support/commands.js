/*
 * @Author: Summer Lee
 * @Date: 2022-07-01 02:50:14
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-01 17:27:44
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

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
	cy.request({
		url: 'http://localhost:3001/api/blogs',
		method: 'POST',
		body: { title, author, url, likes },
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
		}
	})

	cy.visit('http://localhost:3000')
})